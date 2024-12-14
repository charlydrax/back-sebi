const http = require('http');
const app = require('./app');
const port = 8080;
const hostname = '127.0.0.1'
const { Sequelize } = require('sequelize');
const express = require('express');
const router = require('./routes/users');
const sequelize = require('./models');
const usersData = require('../api-users.json');
const { log } = require('console');
const bodyParser = require('body-parser');
// const router = require('./routes/users');
app.use(express.json())
app.use(router)
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Defined the models Users
const Users = sequelize.define('Users', {
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true, // Définir id_user comme clé primaire
    autoIncrement: true // Si c'est un identifiant auto-incrémenté
  },
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
app.get('/recep', (req, res) =>{
  console.log("req.body");
  
  console.log(req.body);
  const table = []
  const user_tab = {
    "id_user":0,
    "username": "toto6",
    "email":"toto2@gmail.com",
    "password": "1234",
    "image_profil": "/image",
    "admin": 2
  }
  
  sequelize.query(`INSERT INTO 'users' ('username','email','password','image_profil','admin') VALUES ('totofefe','toto2@gmail.com','1234','/image',2);`)

  // const newUsersData = [...usersData, user_tab]
  // usersData.push(newUsersData)
  // console.log(table);
  
  
  res.send(req.body); 

})
app.listen(port, hostname, () => {
    console.log(`Server is listening on port http://${hostname}:${port}`)
});