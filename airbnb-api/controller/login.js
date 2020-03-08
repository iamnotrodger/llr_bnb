// WARNING: without encryption
// TODO: encrypt the password
const handleLogin = async(req, res, db_pool) => {
    // handle http request
    const {email, password} = req.body
    if (!email || !password) {
        res.end()
        return res.status(400).send('Some unacceptable empty fields')
    }
    const input_password = password
    // check the email and password
    const client = await db_pool.connect()
    try {
        const queryText = 'SELECT password FROM project.login WHERE email = $1'
        client.query(
            queryText, [email]
        ).then(db_res => {
            const {password} = db_res.rows[0]
            console.log(password) // test
            if (input_password == password) {
                res.status(200).send('Login successfully')
            } else {
                res.status(400).send('Incorrect password')
            }
        }).catch(err => {
            console.error("Error during the query.", err.stack)
            res.status(400).send('No such email.')
        })
    } finally {
        client.release()
    }
}

module.exports = {
    handleLogin
}