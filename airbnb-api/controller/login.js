const handleLogin = async (req, res, db_pool, Joi, CryptoJS) => {
	// handle http request
	const schema = {
		email: Joi.string()
			.min(3)
			.email()
			.required(),
		password: Joi.string()
			.min(8)
			.required()
	};
	const { error } = Joi.validate(req.body, schema);
	if (error) {
		res.status(400).json(error.details[0].message);
		return;
	}
	const { email, password } = req.body;
	const { words } = CryptoJS.SHA256(password);

	// check the email and password
	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT password FROM project.login WHERE email = $1;';
			const { rows } = await client.query(queryText, [email]);
			const { password } = rows[0];

			if (words.toString() === password) {
				// try to get uid, gid and hid if it exits
				var ids = {
					uid: null,
					gid: null,
					hid: null,
					empid: null
				};
				try {
					await getUid(client, email, ids);
					await getGid(client, ids);
					await getHid(client, ids);
					await getEmpid(client, ids);
					res.status(200).json(ids);
				} catch (err) {
					console.error(
						'Error during the query.',
						err.stack
					);
					res.status(400).json(
						'Something wrong.'
					);
				}
			} else {
				res.status(400).json('Incorrect password.');
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

const getUid = async (client, email, ids) => {
	const uidQueryText = 'SELECT uid FROM project.usr WHERE email = $1;';
	const { rows } = await client.query(uidQueryText, [email]);
	if (rows[0] != undefined) {
		ids.uid = rows[0].uid;
	}
};

const getGid = async (client, ids) => {
	const gidQueryText = 'SELECT gid FROM project.guest WHERE uid = $1;';
	const { rows } = await client.query(gidQueryText, [ids.uid]);
	if (rows[0] != undefined) {
		ids.gid = rows[0].gid;
	}
};

const getHid = async (client, ids) => {
	const hidQueryText = 'SELECT hid FROM project.host WHERE uid = $1;';
	const { rows } = await client.query(hidQueryText, [ids.uid]);
	if (rows[0] != undefined) {
		ids.hid = rows[0].hid;
	}
};

const getEmpid = async (client, ids) => {
	const empidQueryText = 'SELECT empid FROM project.employee WHERE uid = $1;';
	const { rows } = await client.query(empidQueryText, [ids.uid]);
	if (rows[0] != undefined) {
		ids.empid = rows[0].empid;
	}
}

module.exports = {
	handleLogin
};
