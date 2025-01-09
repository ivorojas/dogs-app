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

router.get('/dogs', getDogsToRouter)

router.get("/dogs/:id", getDogToRouter);

router.get("/temperaments", getTemperaments);

router.post("/dogs", createDogToRouter);


module.exports = router;