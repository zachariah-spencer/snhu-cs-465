const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
  .route("/trips")
  .get(tripsController.tripsList) // GET Method routes tripsList
  .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method adds a trip

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // GET Method routes tripsFindBycode - requires a parameter
  .put(tripsController.tripsUpdateTrip); // PUT Method routes tripsUpdateTrip - requires a parameter(s)

module.exports = router;
