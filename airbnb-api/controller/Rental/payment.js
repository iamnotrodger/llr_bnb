// Route (POST): /api/rental/rental-agreement/guest/:gid/payment
// To Kangwei:
//     When a rental agreement is added, a pending payment will also be added.
//     Here you just need to send me `pid, rtid, method, card_num`
//
//     Besides, I will also assume that a guest can pay the rental agreement,
//     when the rental agreement is agreed by the host. 
const handlePayment = async (req, res, db_pool, Joi) => {
    // handle http request
    const schema = {
        pid: Joi.number()
            .integer()
            .required(),
        rtid: Joi.number()
            .integer()
            .required(),
        method: Joi.string()
            .valid([
                'credit card',
                'debit card'
            ])
            .required(),
        card_num: Joi.string()
            .min(16)
            .max(16)
            .regex(/^\d*$/)
            .required()
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    const { pid, rtid, method, card_num } = req.body;
    // console.log(card_num); // test
    
    try {
        const client = await db_pool.connect();
        try {
            const rentalAgreementQueryText = 
                'SELECT signing FROM project.rental_agreement WHERE rtid = $1;';
            const { rows } = await client.query(rentalAgreementQueryText, [rtid]);
            const { signing } = rows[0];
            if (signing != 'approved') {
                res.status(400).json('The rental agreement is not approved by the host yet.');
                await client.release();
                return;
            } else {
                const PaymentQueryText = 
                    'UPDATE project.payment SET method = $1, card_num = $2, status = $3 WHERE pid = $4;';
                await client.query(PaymentQueryText, [method, card_num, 'completed', pid])
                res.status(200).json('Payment is completed')
            }
        } catch (err) {
            console.error('Error during the payment.', err.stack);
            res.status(400).json('Unable to pay the rental agreement.');
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

module.exports = {
    handlePayment
}