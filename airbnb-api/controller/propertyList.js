// Route:  /api/property-list/:type/:num
// Route: /api/property-list/:type /This will grap every property with the type
const handlePropertyListNum = async (req, res, db_pool) => {
	const { type, num } = res.params;
	try {
		const client = await db_pool.connect();
	} finally {
		client.release();
	}
};

const handlePropertyList = async (req, res, db_pool) => {
	const { type } = res.params;
	try {
		const client = await db_pool.connect();
	} finally {
		client.release();
	}
};

module.exports = {
	handlePropertyList,
	handlePropertyListNum
};
