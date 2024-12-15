const { Sequelize } = require('sequelize');
const sequelize = require('./index');

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
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  module.exports = { Users };