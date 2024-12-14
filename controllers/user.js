const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models');
const usersData = require('../../api-users.json')
const { Sequelize } = require('sequelize');
const fs = require('fs')
const path = require('path');
const { log } = require('console');
const filePath = path.resolve('api-users.json');

const home = (req, res, next) => {

    res.status(200).send("page d'accueil")
}
const signup = (req, res, next) => {
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
    console.log("req.body");
    console.log(req.body);
    console.log(usersData)
    usersData.push(req.body)
    console.log(usersData)
    //Insert the datas's JSON
    Users.bulkCreate(usersData, {ignoreDuplicates: true})
    console.log("Données JSON insérées dans la BDD");
    console.log('ok');
    
    // try{
    //     bcrypt.hash(req.body.password, 10)
    //         .then(hash => {
    //             // const user = new sequelize({
    //             //     username: req.body.username,
    //             //     email: req.body.email,
    //             //     password: hash,
    //             //     image_profil: req.body.email,
    //             //     admin: req.body.admin,
    //             // });

    //             usersData.push(req.body)
    //         })
    // }catch(err){
    //     err => res.status(500).json({ err })
    // }
    
};

const login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

const getAllUsers = (req, res, next) => {
    res.send('salut')
};

const test = (req, res, next) => {
    try{
        sequelize.authenticate();   
        console.log('Connecté à la base de données MySQL!');
        // console.log(sequelize.query);
        console.log("authentifié");
        console.log(req.body);
        
        usersData.push(req.body)
        res.status(200).json(usersData)
        // res.status(200).send("Envoie à la BDD réussi")
    }catch(err){
        res.status(500).send("Erreur 500 avec sebi", err)
    }
};
const signup_user = (req, res, next) =>{

}

const api_users = async (req, res, next) => {
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
  
    try{
        const users = await Users.findAll()
        res.json(users);

    }catch (error){
        res.status(500).json({message: "Erreur lors de la récuperation des users"})
    }
};

module.exports = { signup, login, getAllUsers, test, api_users, home }