const { API_KEY } = process.env;
const axios = require("axios");
const e = require("express");
//require("dotenv").config();

const { Temperament } = require("../db.js");

const saveApiToTemperaments = async () => {
  try {
    let apiTemperaments = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    //console.log(apiTemperaments[0])
    apiTemperaments = apiTemperaments.data
      .map((e) => e.temperament)
      .join()
      .replaceAll(" ", "") // reemplaza espacios vacios de mas entre los elementos
      .split(",")
      .sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    //console.log(apiTemperaments);
    let set = new Set(apiTemperaments);
    // lo vuelvo a hacer array, porque aunque se pueda iterar, en el insomnia no figura
    let temperaments = Array.from(set);
    temperaments.shift();
    //console.log(temperaments)
    /*
    let temperaments = apiTemperaments.data
      .map((e) => e.temperament)
      .join()
      .replaceAll(" ", "") // reemplaza espacios vacios de mas entre los elementos
      .split(",");

    temperaments = temperaments
      // esto quita los strings vacios que quedan  .filter((t) => t !== "")
      .sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    let set = new Set(temperaments);
    // lo vuelvo a hacer array, porque aunque se pueda iterar, en el insomnia no figura
    temperaments = Array.from(set);
      */

    //console.log(temperaments);

    //BASE DE DATOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOS ESTO NECESITAS VER
    /*
    temperaments.forEach((t) => {
      //compruebo que no haya strings vacios con este if y agrego a la base de datos
      if (t.length > 0) {
        Temperament.findOrCreate({
          where: { name: t },
        });
      }
    });
    */
    // ESTE CONSOLEEEEEEEEEEEE console.log(temperaments);

    return temperaments;
  } catch (error) {
    console.log("Error en getApiTemperaments");
  }
};

const getDbTemperaments = async () => {
  try {
    /*
    await saveApiToTemperaments();
    let infoConsole;
    */
    //console.log(infoConsole);
    let dbTemperaments = await Temperament.findAll({
      attributes: ["name"],
    });
    dbTemperaments = dbTemperaments.map((e) => e.dataValues.name);
    //console.log(dbTemperaments);
    //dbTemperaments = [dbTemperaments[0].dataValues.name];
    //console.log(dbTemperaments);
    return dbTemperaments;
  } catch (error) {
    console.log("Error en getDBTemperaments");
  }
};

/*





  GUARDAR TODO LO DE LA API EN EL DATABASE Y DSP  BUSCA TODO EN LA DATABASE



 


*/

const getTemperaments = async (req, res) => {
  try {
    //let apiTemperaments = await saveApiToTemperaments();
    let apiTemperaments = await saveApiToTemperaments();
    let dbTemperaments = await getDbTemperaments();
    let temperaments = dbTemperaments
      .concat(apiTemperaments)
    //console.log(dbTemperaments);
    /*let temperaments = dbTemperaments
      .concat(apiTemperaments)
      .join()
      .replaceAll(", ", ",") // reemplaza espacios vacios de mas entre los elementos
      .split(",")
      .sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    let set = new Set(temperaments);
    temperaments = Array.from(set);*/
    //temperaments = temperaments.filter((e) => e.temperament.length > 0);
    //console.log(temperaments);
    //temperaments = dbTemperaments.concat(apiTemperaments);
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getTemperaments,
};
