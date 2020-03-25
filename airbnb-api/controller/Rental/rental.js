// Route (POST): /api/rental/add-rental-agreement
// To Rodger:
//     Here I assume that you will just give 'prid' in the http request,
//     and I will query the database for the hid of this property.
//
//     Besides, I also assume that when a rental agreement is created, 
//     the default value for signing is 'pending'.
const handleAddRentalAgreement = async (req, res, db_pool) => {
    
}

module.exports = {
    handleAddRentalAgreement
}