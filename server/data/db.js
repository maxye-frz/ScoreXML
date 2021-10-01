require("dotenv").config();
const mongoose = require("mongoose");

const password = process.env.DB_ADMIN_PASSWORD;
const dbname = "scoreXML-db";
const URI = `mongodb+srv://scoreXML-admin:${password}@scorexml-db.9keon.mongodb.net/${dbname}?retryWrites=true&w=majority`;
// const option = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// };

function connect(token) {
  mongoose.connect(URI,
    err => {
        if (err) throw err;
        console.log('connect to MongoDB')
    });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB!");
  });
}

module.exports = { connect };