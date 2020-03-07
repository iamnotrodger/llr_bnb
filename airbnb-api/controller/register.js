const error = require('./error')

// WARNING: without encryption
const handleRegister = (req, res, db_pool) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send('Incorrect form')
    } else {
        res.status(200).send('OK')
        res.end()
    }
    db_pool.connect((err, client, done) => {
        client.query('BEGIN', err => {
            if (error.shouldAbort(err)) return
            const queryText = 'INSERT INTO project.login(email, password) VALUES($1, $2);'
            client.query(queryText, [email, password], err => {
                if (error.shouldAbort(err)) return
                client.query('COMMIT', err => {
                    if (err) {
                        console.log('Error in committing transaction', err.stack)
                    }
                    done()
                })
            })
        })
    })
}

module.exports = {
    handleRegister
}