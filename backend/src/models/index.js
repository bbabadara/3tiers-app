const sequelize = require('../config/sequelize');
const Product = require('./Product');

const db = {
  sequelize,
  Product,
};

module.exports = db;
