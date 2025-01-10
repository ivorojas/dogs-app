const express = require('express');
const router = express.Router();
const axios = require('axios');
const {
    getDogsToRouter,
    getDogToRouter,
    createDogToRouter
} = require("../controllers/dogs-controller.js");

const {
  getTemperaments,
} = require("../controllers/temperaments-controller.js");

/*
router.get('/dogs', (req, res) => {
  res.send('<h1>List of Dogs</h1><p>Here you would show a list of dogs</p>'); // Or send an actual list of dogs as JSON
});
*/


/*
const {
    getTemperaments,
  } = require("../controllers/temperaments-controller.js");
*/
/*
  app.get('/dogs', (req, res) => {
    res.send('<h1>List of Dogs</h1><p>Here you would show a list of dogs</p>'); // Or send an actual list of dogs as JSON
});
*/


router.get('/dogs', getDogsToRouter)

router.get("/dogs/:id", getDogToRouter);

router.get("/temperaments", getTemperaments);

router.post("/dogs", createDogToRouter);


module.exports = router;