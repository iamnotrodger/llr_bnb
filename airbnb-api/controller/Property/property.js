// Route (GET): /api/property/:prid
// TODO: grab rental agreement to see the available dates, then create an array of unavailable dates according to every start and end dates in every rental agreement the rental agreement
const handleViewProperty = async (req, res, db_pool) => {
  // get the path parameter
  const { prid } = req.params;

  try {
    const client = await db_pool.connect();
    try {
      // get title and address
      const propertyQueryText =
        "SELECT * FROM project.property WHERE prid = $1;";
      const res1 = await client.query(propertyQueryText, [prid]);
      const { hid, title, address } = res1.rows[0]; // hid is used to get host uid
      // get host name
      const hostQueryText = "SELECT uid FROM project.host WHERE hid = $1;";
      const res2 = await client.query(hostQueryText, [hid]);
      const { uid } = res2.rows[0]; // uid is used to get the host name
      const usrQueryText =
        "SELECT firstname, lastname FROM project.usr WHERE uid = $1;";
      const res3 = await client.query(usrQueryText, [uid]);
      const { firstname, lastname } = res3.rows[0];
      // get bed number
      const bedQueryText =
        "SELECT SUM(bed_num) AS bed_num FROM project.room WHERE prid = $1 AND room_type = 'bedroom' GROUP BY prid;";
      const res4 = await client.query(bedQueryText, [prid]);
      const { bed_num } = res4.rows[0];
      // get washroom num
      const washroomQueryText =
        "SELECT COUNT(*) AS washroom_num FROM project.room WHERE prid = $1 AND room_type = 'washroom' GROUP BY prid;";
      const res5 = await client.query(washroomQueryText, [prid]);
      const { washroom_num } = res5.rows[0];
      // get guest_num and price
      const pricingQueryText =
        "SELECT guest_num, price FROM project.pricing WHERE prid = $1;";
      const res6 = await client.query(pricingQueryText, [prid]);
      const { guest_num, price } = res6.rows[0];
      // get reviews
      const reviewQueryText =
        "SELECT R.rating, R.comment, R.gid, U.firstname, U.lastname FROM project.review as R, project.usr as U, project.guest as G WHERE R.prid = $1 AND U.uid = G.uid AND R.gid = G.gid";
      const res7 = await client.query(reviewQueryText, [prid]);
      const reviews = res7.rows;
      // get avgs
      const avgsQueryText =
        "SELECT AVG(rating) AS rating, AVG(communication) AS communication, AVG(cleanliness) AS cleanliness, AVG(value) AS value FROM project.review WHERE prid = $1 GROUP BY prid;";
      const res8 = await client.query(avgsQueryText, [prid]);
      const avgs = res8.rows[0];
      // console.log(res8.rows[0]); // test
      res.status(200).jsonp({
        title: title,
        location: address,
        host_name: firstname + " " + lastname,
        bed_num: bed_num,
        washroom_num: washroom_num,
        guest_num: guest_num,
        price: price,
        reviews: reviews,
        avgs: avgs
      });
    } catch (err) {
      console.error("Error during the query.", err.stack);
      res.status(400).json("Unable to get property.");
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(503).json("Service Unavailable");
    console.error("Error during the connection to the database", err.stack);
  }
};

// Route (POST): /api/property/add-property
const handleAddProperty = async (req, res, db_pool, Joi) => {
  // handle http request
  const { property, rooms, pricing } = req.body;
  // console.log(pricing); // test
  const { code, message } = await addProperty(
    db_pool,
    property,
    rooms,
    pricing,
    Joi
  );
  res.status(code).json(message);
};

const addProperty = async (db_pool, property, rooms, pricing, Joi) => {
  // validate
  const propertySchema = {
    address: Joi.string()
      .max(255)
      .required(),
    property_type: Joi.string()
      .max(25)
      .valid(["House", "Apartment", "Hotel", "Bed and Breakfast"])
      .required(),
    hid: Joi.number().required(),
    country: Joi.string()
      .max(30)
      .required(),
    title: Joi.string()
      .max(60)
      .required()
  };
  const res1 = Joi.validate(property, propertySchema);
  const pricingSchema = {
    guest_num: Joi.number()
      .integer()
      .required(),
    price: Joi.number().required()
  };
  const res2 = Joi.validate(pricing, pricingSchema);
  if (res1.error && res2.error) {
    return {
      code: 400,
      message:
        res1.error.details[0].message +
        "\n" +
        res2.message.error.details[0].message
    };
  } else if (res1.error) {
    return {
      code: 400,
      message: res1.error.details[0].message
    };
  } else if (res2.error) {
    return {
      code: 400,
      message: res2.error.details[0].message
    };
  }
  const { address, property_type, hid, country, title } = property;
  const { guest_num, price } = pricing;

  try {
    const client = await db_pool.connect();
    try {
      await client.query("BEGIN");
      // insert the property into the property table
      const addPropertyText =
        "INSERT INTO project.property(address, property_type, hid, country, title) VALUES($1, $2, $3, $4, $5) RETURNING prid;";
      const { rows } = await client.query(addPropertyText, [
        address,
        property_type,
        hid,
        country,
        title
      ]);
      const { prid } = rows[0]; // get prid
      // console.log(prid) // test
      // insert the rooms into the room table
      const addRoomText =
        "INSERT INTO project.room(prid, room_type, bed_num) VALUES($1, $2, $3);";
      for (i in rooms) {
        const { room_type, bed_num } = rooms[i];
        await client.query(addRoomText, [prid, room_type, bed_num]);
      }
      // insert the pricing into the pricing table
      const addPricingText =
        "INSERT INTO project.pricing(guest_num, prid, price) VALUES($1, $2, $3);";
      await client.query(addPricingText, [guest_num, prid, price]);
      await client.query("COMMIT");
      return { code: 200, message: "Property was added." };
    } catch (err) {
      console.error("Error during the transaction, ROLLBACK.", err.stack);
      await client.query("ROLLBACK");
      return {
        code: 400,
        message: "Unable to add property"
      };
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error during the connection to the database", err.stack);
    return {
      code: 503,
      message: "Error during the connection to the database"
    };
  }
};

const handleAddRooms = async (req, res, db_pool) => {
  const { prid, rooms } = req.body;
  const { code, message } = await addRooms(db_pool, prid, rooms);
  res.status(code).json(message);
};

const addRooms = async (db_pool, prid, rooms) => {
  try {
    const client = await db_pool.connect();
    try {
      const addRoomText =
        "INSERT INTO project.room(prid, room_type, bed_num) VALUES($1, $2, $3);";
      for (i in rooms) {
        const { room_type, bed_num } = rooms[i];
        await client.query(addRoomText, [prid, room_type, bed_num]);
      }
      return { code: 200, message: "Property was added." };
    } catch (err) {
      console.error(
        "Error during inserting values to the room table.",
        err.stack
      );
      return {
        code: 400,
        message: "Unable to add rooms"
      };
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error during the connection to the database", err.stack);
    return {
      code: 503,
      message: "Error during the connection to the database"
    };
  }
};

module.exports = {
  handleViewProperty,
  handleAddProperty,
  addProperty,
  handleAddRooms,
  addRooms
};
