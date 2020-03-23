const handleRegister = async (req, res, db_pool) => {
    // handle http request
    const {uid} = req.body;

    // insert uid to the host table
    try {
        const client = await db_pool.connect();
        try {
            const hostText = 
                'INSERT INTO project.host(uid) VALUES($1);';
            await client.query(hostText, [uid]);
            res.status(200).json('Successfully become a host');
        } catch (err) {
            console.error(
                'Error during inserting uid to the host table.',
                err.stack
            );
            res.status(400).json('Error during the registration as a host');
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
    handleRegister
};