const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/trips");

router.route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripsList
    .post(tripsController.tripsAddTrip); // POST Method adds a trip

router.route("/trips/:tripCode").get(tripsController.tripsFindByCode); // GET Method routes tripsFindBycode - requires a parameter

module.exports = router;