const express = require("express");
const mongoose = require("mongoose");
const OpportunityRouter = require("./routes/OpportunityRoutes");

require("dotenv/config");

const app = express();
app.use(express.json()); // Make sure it comes back as json

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@${process.env.NAME_CLUSTER}.zomjy.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(OpportunityRouter);

app.listen(3333, () => {
  console.log("Server Started ! ! ! ✈");
});
