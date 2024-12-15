const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models');
// const usersData = require('../../api-users.json')
const { Sequelize } = require('sequelize');
const {usersData} = require('../server')
const {Users} = require('../models/user_model'); // Import du modèle User


const home = (req, res, next) => {

    res.status(200).send("page d'accueil")
}
const create_test = (req, res, next) =>{
  console.log("compte crée");

  res.json({message: "salut"})
  
}
const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création de l'utilisateur dans la base de données
    const newUser = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        image_profil: req.body.image_profil, // Vous pouvez ajuster selon votre formulaire
        admin: req.body.admin,
        token: ""
    });

    console.log('Utilisateur créé avec succès :', newUser);
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
} catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
}
    
};

const login = (req, res, next) => {
  console.log("req.body.email");
  console.log(req.body.email);
  
    Users.findOne({ email: req.body.email })
        .then(user => {
            console.log(user.username);
            if(user.email !== req.body.email){
              console.log(user.email);
              console.log(req.body.username);
              
              res.status(403).send("champs invalid")
            }
          
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign({ userId: user._id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })
                      
                    const updateUser = user.update({
                      token: token,
                  });
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                        user: updateUser
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

module.exports = { signup, login, getAllUsers, test, api_users, home, create_test }