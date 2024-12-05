const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const user = require('bdd du user');
// const express = require('express')
// const app = express()

// app.use(express.json())

// app.get('/coucou', (res, req)=>{
//     console.log("bon");
//     res.status(200).send('envoie')
// })
const signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(err => res.status(500).json({ err }));
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

module.exports = { signup, login, getAllUsers }