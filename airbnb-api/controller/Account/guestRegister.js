// Route (POST): /api/guest-register
const handleRegister = async (req, res, db_pool, Joi, CryptoJS) => {
	// handle http request
	const schema = {
		email: Joi.string()
			.email()
			.min(3)
			.max(256)
			.required(),
		password: Joi.string()
			.min(8)
			.required(),
		firstName: Joi.string()
			.max(35)
			.required(),
		middleName: Joi.string().max(35),
		lastName: Joi.string()
			.max(35)
			.required(),
		address: Joi.string()
			.max(255)
			.required(),
		phoneNum: Joi.string().max(15)
	};
	const { error } = Joi.validate(req.body, schema);
	if (error) {
		res.status(400).json(error.details[0].message);
		return;
	}
	const {
		email,
		password,
		firstName,
		middleName,
		lastName,
		address,
		phoneNum
	} = req.body;

	// Encrypte the password
	const { words } = CryptoJS.SHA256(password);

	// Make the transaction with the database
	try {
		const client = await db_pool.connect();
		try {
			await client.query('BEGIN');
			// insert into user table
			const userText =
				'INSERT INTO project.usr(firstName, middleName, lastName, email, address, phoneNum) VALUES($1, $2, $3, $4, $5, $6) RETURNING uid;';
			const res1 = await client.query(userText, [
				firstName,
				middleName,
				lastName,
				email,
				address,
				phoneNum
			]);
			const { uid } = res1.rows[0];
			// insert into guest table
			const guestText =
				'INSERT INTO project.guest(uid) VALUES($1) RETURNING gid;';
			const res2 = await client.query(guestText, [uid]);
			const { gid } = res2.rows[0];
			// insert into login table
			const loginText =
				'INSERT INTO project.login(email, password) VALUES($1, $2);';
			await client.query(loginText, [
				email,
				words.toString() // encrypted password
			]);
			await client.query('COMMIT');
			res.status(200).jsonp({
				uid: uid,
				gid: gid
			});
		} catch (err) {
			console.error(
				'Error during the transaction, ROLLBACK.',
				err.stack
			);
			await client.query('ROLLBACK');
			res.status(400).json('Error during the registration');
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
	handleRegister
};
