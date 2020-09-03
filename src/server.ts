//Import of node modules
const express = require("express");
const mongoose = require("mongoose");

//Import of created files
const OpportunityRouter = require("./routes/OpportunityRoutes");

//import of environment variables
require("dotenv/config");

//Express Instantiation
const app = express();

app.use(express.json()); // Make sure it comes back as json

//Mongodb access URL
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@${process.env.NAME_CLUSTER}.zomjy.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

//Mongodb creator
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//This is passed so that the code understands that OpportunityRouter is the file where the routes are
app.use(OpportunityRouter);

app.listen(3333, () => {
  console.log("Server Started ! ! ! ✈");
});
