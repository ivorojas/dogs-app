const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./src/routes')
require('dotenv').config();
const cors = require('cors');
const { conn } = require('./src/db');
//const { sequelize } = require('./src/db');


app.use(cors());

app.use(express.json());

app.use('/', routes);

/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  */
conn.authenticate().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});
