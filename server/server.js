require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const router = express.Router();

//routes
const projectsRoute = require("./routes/projectRoute");
// const guideRouter = require("./routes/guideRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");

//use route modules
app.use("/projects", projectsRoute);

//authentication routes
app.use("/register", signupRoute);
app.use("/login", loginRoute);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
