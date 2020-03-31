// Route (GET): /api/employee/:empid/property-list
const handleEmpPropertyList = async (req, res, db_pool) => {
    // get http path parameter
    const { empid } = req.params;

    try {
        const client = await db_pool.connect();
        try {
            // get the employee's country
            const employeeQueryText =
                'SELECT country FROM project.employee NATURAL JOIN project.usr WHERE empid = $1;';
            const res1 = await client.query(employeeQueryText, [empid]);
            const { country } = res1.rows[0];
            // get properties which are from the same country with the employee
            const propertyQueryText =
                'SELECT * FROM project.property WHERE country = $1;';
            const res2 = await client.query(propertyQueryText, [country]);
            // get bed_num for each property
            const bedQueryText =
                "SELECT SUM(bed_num) AS bed_num FROM project.room WHERE prid = $1 AND room_type = 'bedroom' GROUP BY prid;";
            for (i in res2.rows) {
                const { prid } = res2.rows[i];
                const res3 = await client.query(bedQueryText, [prid]);
                const { bed_num } = res3.rows[0];
                res2.rows[i].bed_num = bed_num;
            }
            res.status(200).jsonp({
                property_list: res2.rows
            })
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Unable to get the property list.');
        } finally {
            client.release()
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

// Route (GET): /api/employee/:empid/guest-list
const handleGuestList = async (req, res, db_pool) => {
    const { empid } = req.params;

    try {
        const client = await db_pool.connect();
        try {
            // get the employee's country
            const employeeQueryText = 
                'SELECT country FROM project.employee NATURAL JOIN project.usr WHERE empid = $1';
            const res1 = await client.query(employeeQueryText, [empid]);
            const { country } = res1.rows[0];
            const guestQueryText =
                'SELECT * FROM project.guest NATURAL JOIN project.usr WHERE country = $1 ORDER BY gid;';
            const res2 = await client.query(guestQueryText, [country]);
            // console.log(res1.rows); // test
            res.status(200).jsonp({
                guest_list: res2.rows
            });
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
}

module.exports = {
    handleEmpPropertyList,
    handleGuestList,
}