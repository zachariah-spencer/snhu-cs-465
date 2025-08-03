const tripsEndpoint = "https://localhost:3000/api/trips"
const options = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
};

//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET Homepage */
const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
            res.render("travel", { title: "Travlr Getaways", trips: json, message });
        })
        .catch((err) => res.status(500).send(err.message));
    // res.render('travel', { title: "Travlr Getaways", trips});
};

module.exports = {
    travel
}