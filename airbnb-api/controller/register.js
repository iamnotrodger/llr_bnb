// WARNING: without encryption
const handleRegister = async (req, res, db_pool) => {
    // handle http request
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send('Incorrect form')
    } else {
        res.status(200).send('OK')
        res.end()
    }
    // handle database
    const client = await db_pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = 'INSERT INTO project.login(email, password) VALUES($1, $2);'
        await client.query(queryText, [email, password])
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        // throw e
    } finally {
        client.release()
    }
}

module.exports = {
    handleRegister
}