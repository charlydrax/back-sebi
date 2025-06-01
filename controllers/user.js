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

const signup = async (req, res, next) => {
  try {
    console.log('Request body:', req.body); // Debug log

    if (!req.body.password || !req.body.email || !req.body.username) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // verification of email existing
    const existingUser = await Users.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe - changed from req.body.mdp to req.body.password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création de l'utilisateur dans la base de données
    const newUser = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        image_profil: '/default.jpg', // Default value
        admin: 0, // Default value
        token: ""
    });

    console.log('Utilisateur créé avec succès :', newUser);
    res.status(201).json({ 
        message: 'Utilisateur créé avec succès',
        user: {
            id: newUser.id_user,
            username: newUser.username,
            email: newUser.email
        }
    });
  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).json({ 
        error: 'Erreur lors de l\'inscription',
        details: error.message 
    });
  }
};

const login = (req, res, next) => {
  
    Users.findOne({ where: { email: req.body.email}  })
        .then(user => {
            if(user.email !== req.body.email){
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

const logout = (req, res, next) =>{
  console.log(req.userId);
  
  res.send()
}
const getAllUsers = (req, res, next) => {
    res.send('salut')
};

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

module.exports = { signup, login, getAllUsers, api_users, home, logout }