const mongoose = require('mongoose');
const config = require('config');
const autoIncrement = require('mongoose-auto-increment');



const dbURL = config.get('DB_URL');
//  console.log("dbURL",dbURL)

if (!dbURL) {
  // eslint-disable-next-line no-console
  console.error('DB URL empty');
  process.exit(1);
}

// for auto increment plugin
autoIncrement.initialize(mongoose.connection);


async function connectToDB() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: true,
    });

    // eslint-disable-next-line no-console
    console.log('Succefully Connected To DB');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Connection Failed');
    process.exit(1);
  }
}

connectToDB();

const db = mongoose.connection;

module.exports = db;
