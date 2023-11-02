require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
const router = express.Router();
// Configure CORS to allow requests from your frontend origin
app.use(cors({ origin: "http://localhost:3000" }));

//routes
const projectsRoute = require("./routes/admin routes/projectRoute");
// const guideRouter = require("./routes/guideRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/admin routes/signupRoute");
const reviewerRoute = require("./routes/admin routes/reviewerRoute");
const guideRoute = require("./routes/guideRoute");
const studentRoute = require("./routes/studentRoute");

//use route modules
app.use("/projects", projectsRoute);

//authentication routes
app.use("/register", signupRoute);
app.use("/login", loginRoute);
//route to add reviewer
app.use("/reviewers", reviewerRoute);
app.use("/guide", guideRoute);
app.use("/student", studentRoute);

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
