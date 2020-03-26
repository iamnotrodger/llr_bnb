// Route (POST): /api/rental/rental-agreement/guest/:gid/payment
// To Kangwei:
//     When a rental agreement is added, a pending payment will also be added.
//     Here you just need to send me `pid, method, card_num`
const handlePayment = async (req, res, db_pool, Joi) => {
    // handle http request
    const schema = {
        pid: Joi.number()
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
    const { pid, method, card_num } = req.body;
    // console.log(card_num); // test
    
    try {
        const client = await db_pool.connect();
        try {
            const PaymentQueryText = 
                'UPDATE project.payment SET method = $1, card_num = $2, status = $3 WHERE pid = $4;';
            await client.query(PaymentQueryText, [method, card_num, 'completed', pid])
            res.status(200).json('Payment is completed')
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