const http = require('http');
const app = require('./app');
const port = 8080;
const { Sequelize } = require('sequelize');
const express = require('express');
const router = require('./routes/users');
const sequelize = require('./models');
const usersData = require('../api-users.json')
// const router = require('./routes/users');
app.use(express.json())
app.use(router)

// Defined the models Users
const Users = sequelize.define('Users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_profil: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

//initialise the login, sync BDD and insert data
(async () => {
  try{
      await sequelize.authenticate()
      console.log("connecté à la BDD");
      
      //sync of models and bdd
      await  sequelize.sync({ force: false});// force: true => remake the table at any departure
      console.log("Table 'users' synchronisée");

      //Insert the datas's JSON
      await Users.bulkCreate(usersData, {ignoreDuplicates: true})
      console.log("Données JSON insérées dans la BDD");
      
  } catch(error){
      console.error("Erreur de connexion ou d'insertion : ", error);
  }
})();


app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`)
});