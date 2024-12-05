const express = require('express');
const userRoutes = require('./routes/users');
const app = express();
const sequelize = require('./models')

sequelize.sync()
    .then(() => console.log('Tables synchronisées'))
    .catch(err => console.log('Problème rencontré lors de la synchro : ', err));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());//intercepte toutes les requêtes qui contiennent du json pour donner accès au corps de la requête

app.use('/api/auth', userRoutes);

module.exports = app;