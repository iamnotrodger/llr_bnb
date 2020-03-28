// Route (GET): /api/profile/uid
const handleProfile = async (req, res, db_pool) => {
        const { uid } = req.params;
        try {
                const client = await db_pool.connect();
                try {
                        const queryText =
                                'SELECT * FROM project.usr WHERE uid = $1';
                        const { rows } = await client.query(queryText, [uid]);

                        if (rows.length > 0) {
                                res.status(200).json(rows[0]);
                        } else {
                                res.status(400).json('User does not exist');
                        }
                } catch (err) {
                        console.error('Error during the query.', err.stack);
                        res.status(400).json('Invalid Inputs.');
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
};

module.exports = {
        handleProfile
};
