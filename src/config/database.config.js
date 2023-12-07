const mongoose = require("mongoose");
const logger = require('./logger.config');

class DatabaseConnection {
  constructor() {
    this.host = process.env.MONGO_HOST;
    this.port = process.env.MONGO_PORT;
    this.database = process.env.MONGO_DATABASE;
    this.connectionString = `mongodb://${this.host}:${this.port}/${this.database}`
  }

  async connectDatabase() {
    try {
      this.connection = await mongoose.connect(this.connectionString);
    } catch (error) {
      logger.error(error.message);
    }
  }
}

module.exports = DatabaseConnection;