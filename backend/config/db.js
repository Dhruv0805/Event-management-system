const mongoose = require('mongoose');

// When USE_IN_MEMORY_DB=true, spin up a temporary in-memory MongoDB
// instead of connecting to Atlas/local Mongo. Everything else in the
// app (models, controllers, routes) is untouched — Mongoose talks to
// this the exact same way it talks to a real MongoDB server.
const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (process.env.USE_IN_MEMORY_DB === 'true') {
      // Lazily required so this package is only needed when actually used.
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log('Using in-memory MongoDB for testing (no persistent data).');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
