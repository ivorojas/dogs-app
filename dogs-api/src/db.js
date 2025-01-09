const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Host de la base de datos
    dialect: 'postgres', // El dialecto de la base de datos
  }
);

// Importar modelos
/*const DogModel = require('./models/Dog');
DogModel(sequelize);
*/

/*
const DogModel = require('./models/Dog');
const TemperamentModel = require('./models/Temperament');


const Dog = DogModel(sequelize);
console.log('holaaaaa' + Dog)
const Temperament = TemperamentModel(sequelize);
*/

/* GRAN AVANCE
const Dog = require('./models/Dog');;
console.log('holaaaaa' + Dog)
const Temperament = require('./models/Temperament');
*/
require('./models/Dog')(sequelize);
require('./models/Temperament')(sequelize);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: "razasTempers" });
Temperament.belongsToMany(Dog, { through: "razasTempers" });

/*
// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
});
*/
sequelize.sync({ force: true }).then(() => {
  console.log('Base de datos reiniciada y tablas recreadas');
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});

/*
module.exports = sequelize;
*/
/*
module.exports = {
  sequelize,
  Dog,
  Temperament,
};
*/

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
