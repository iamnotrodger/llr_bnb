// WARNING: without encryption
// TODO: encrypt the password 
// TODO: send email and password to the login page
const handleRegister = async (req, res, db_pool) => {
    // handle http request
    const {email, password, firstName, middleName, lastName, address} = req.body;
    if (!email || !password || !firstName || !lastName || !address) {
        return res.status(400).send('Some unacceptable empty fields')
    } else if (email.length > 255 || firstName.length > 35 || middleName.length > 35 
               || lastName.length > 35 || address.length > 255) {
        return res.status(400).send('Some fields are over the limit')
    } else {
        res.status(200).send('OK')
        res.end()
    }
    // handle database
    const client = await db_pool.connect()
    try {
        await client.query('BEGIN')
        
        // insert into user table
        const userText = 'INSERT INTO project.usr(firstName, middleName, lastName, email, address) VALUES($1, $2, $3, $4, $5) RETURNING uid;'
        await client.query(
            userText, [firstName, middleName, lastName, email, address]
        ).then(res => {
            // get auto-generated uid
            const {uid} = res.rows[0]
            console.log(uid)
            // insert into guest table
            const guestText = 'INSERT INTO project.guest(uid) VALUES($1);'
            client.query(guestText, [uid])
            // insert into login table
            const loginText = 'INSERT INTO project.login(email, password) VALUES($1, $2);'
            client.query(loginText, [email, password])
        }).catch(err => {
            console.error("Postgresql Error.", err.stack)
        })
        await client.query('COMMIT')
    } catch (err) {
        console.error("Error during the transaction, ROLLBACK.", err.stack)
        await client.query('ROLLBACK')
    } finally {
        client.release()
    }
}

module.exports = {
    handleRegister
}