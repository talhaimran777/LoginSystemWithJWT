const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./server');

dotenv.config();
const PORT = process.env.PORT || 5000;

let ConnectDB = async () => {
  try {
    let db = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (db) {
      console.log('Database connected!');
      app.listen(PORT, () => {
        console.log('Server started running!');
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

ConnectDB();
