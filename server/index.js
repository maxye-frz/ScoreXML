// index.js file
const db = require("./data/db.js");
const express = require("express");
// const { onboarding } = require("./data/users.js");
const scoreRoutes = require("./routes/scoreRoutes");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 5000;

db.connect();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({limit: '1mb'}));
app.use(scoreRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});