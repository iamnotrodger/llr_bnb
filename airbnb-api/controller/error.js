const shouldAbort = err => {
    if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
            if (err) {
                console.error('Error in rolling back the client', err.stack)
            }
            done() // release the client back to the pool
        })
    }
    return !!err
}

module.exports = {
    shouldAbort
}