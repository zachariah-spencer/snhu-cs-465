const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcomes, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model.find({}).exec(); // No filtering, return all records
    // Uncomment if debugging response
    // console.log(q);

    if (!q)
    { // No data returned from database
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcomes, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model.find({ 'code' : req.params.tripCode }).exec(); // Return single record matching argued tripCode
    // Uncomment if debugging response
    // console.log(q);

    if (!q)
    { // No data returned from database
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};