const mongoose = require("mongoose");

const dbConnection = async(url) =>
  mongoose.connect(url);

module.exports = {
    dbConnection
}