require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db.js"); // PRBOAR DB SIN JS


const getApiDogs = async () => {
    try {
      const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
      
      return apiDogs.data;
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
};

const getDbDogs = async () => {
  try {
    const dbDogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // compropbar que llegue
    /*
    const dbDogsJson = dbDogs.map(dog => dog.toJSON());
    console.log('holaa', dbDogsJson);
    */
    return dbDogs;
  } catch (error) {
    console.log("Hubo un error en getDbDogs");
  }
};

  /*-------------fusion de los perros de la api de y de la db -----------*/
const getDogs = async () => {
    let apiDogs = await getApiDogs();
    apiDogs = apiDogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      height_min: dog.height.metric.split(" - ")[0],
      height_max: dog.height.metric.split(" - ")[1],
      weight_min: dog.weight.metric.split(" - ")[0],
      weight_max: dog.weight.metric.split(" - ")[1],
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
      created: false,
    }));
  
    
    let dbDogs = await getDbDogs();
    dbDogs = dbDogs.map((dog) => {
      //console.log("Dog dataValues:", dog.dataValues);
      return {
        id: dog.dataValues.id,
        name: dog.dataValues.name,
        height_min: dog.dataValues.height_min,
        height_max: dog.dataValues.height_max,
        weight_min: dog.dataValues.weight_min,
        weight_max: dog.dataValues.weight_max,
        life_span: dog.dataValues.life_span,
        image: dog.dataValues.image,
        temperament: dog.dataValues.Temperaments.map((el) => el.name).join(", "),
        created: dog.dataValues.created,
      };
    });
    //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
   /*
    let dbDogs = await getDbDogs();
    //console.log("HOLAAAAAAAAA", dbDogs)
    dbDogs = dbDogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      height_min: dog.height_min,
      height_max: dog.height_max,
      weight_min: dog.weight_min,
      weight_max: dog.weight_max,
      life_span: dog.life_span,
      image: dog.image,
      temperament: dog.temperaments.map((el) => el.name).join(", "),
      created: dog.created,
    }));
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    */

    //console.log("holaaaaaaaaaaaaaaaaaaaaaaa",dbDogs)


        let dogs = dbDogs.concat(apiDogs);


    return dogs;
};


 /*-----------el que manda al router-------------*/
 /*
const getDogsToRouter = async (req, res) => {
    try {
        let dogs = await getDogs(); 
        if (dogs.length === 0) throw new Error("Not found."); 
        res.status(200).json(dogs); 
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};
*/
const getDogsToRouter = async (req, res) => {
  const { name } = req.query;

  try {
    let dogs = await getDogs();
    if (name) {
      dogs = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    //console.log(dogs);
    if (dogs.length === 0) throw new Error("Not found.");

    res.status(200).json(dogs);
  } catch (error) {
    // console.log("error en getdogstorouter");
    res.status(404).json({ error: error.message });
  }
};

const getDogToRouter = async (req, res) => {

  const { id } = req.params;
  let dogs = await getDogs();
  try {
    console.log('get dog to router se ejecutó')
    //if( Number(id) = ) {}
    let dogFounded = dogs.find((dog) => dog.id == id);

    /*  if (!id) {
      throw new Error("the id does not exist");
    } */
    if (dogFounded) {
      res.status(200).json(dogFounded);
    } else {
      throw new Error("Dog Not Found");
    }
  } catch (error) {
    //console.log("error en getdogtorouter");
    res.status(404).json({ error: error.message });
  }
};

const createDogToRouter = async (req, res) => {
  //console.log('create dog se ha ejecutado')
  //console.log(Dog)
  let {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
    temperament,
    created
    
  } = req.body;
  /*console.log(name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
    temperament,
    created
    )*/
  try {
    //console.log('1')
    if (!name || !height_min || !height_max || !weight_min || !weight_max)
      throw new Error("Bad request.");
    //console.log('2')
    let newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
      created,
    });
    //console.log('3')
    //console.log('holaaaaaaaa')
     //PROBAR TEMPERAMENT CON T MAYUSCULAAAAAAAAA
    temperament = temperament.map((t) => {
      return t[0].toUpperCase() + t.slice(1);
    });
    for await (let temp of temperament) {
      let createdTemperament = await Temperament.findOne({
        where: { name: temp },
      });

      if (!createdTemperament)
        createdTemperament = await Temperament.create({
          name: temp,
        });

      await newDog.addTemperament(createdTemperament);
    }
    res.status(200).send("Dog created succesfully");
  } catch (error) {
    
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
    getDogsToRouter,
    getDogToRouter,
    createDogToRouter
};
  