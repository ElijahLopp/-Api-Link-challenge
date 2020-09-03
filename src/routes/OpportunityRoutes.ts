//Import of node modules
const express = require("express");
//Import of created files
const opportunityModel = require("../models/OpportunityModel");
const libPipedrive = require("../pipedrive/PipedriveServices");
import objectToXml from "../util/objectToXml";
import createNewProduct from "../services/createNewProduct";

//import of environment variables
require("dotenv/config");

const app = express();

//vailidation middleware, just post
function validateMethod(request, response, next) {
  const { method } = request;

  if (method.toUpperCase() != "POST") {
    return response
      .status(400)
      .json({ error: "This route only accepts post method" });
  }

  next();
}

app.use("/pipedriveToBling", validateMethod);

//Route to create a new product inside the bling and add the same ones inside the mongodb
app.post("/pipedriveToBling", async (req, res) => {
  //Data values
  var dataValues = [];

  //TOKEN OF BLING
  const apiKeyBling = `${process.env.TOKEN_BLING}`;

  // New Values
  var newValue = { opportunity: String, date: String, value: Number };

  //Value that will be added on mongodb

  //Deals Filter
  var input = [];
  input["status"] = "won";
  const user = await libPipedrive.DealsController.getAllDeals(input);

  //This repetition structure will return all pipedrive objects
  user.data.map(async (obj) => {
    newValue["opportunity"] = obj.title;
    newValue["date"] = obj.add_time;
    newValue["value"] = obj.value;

    //Adding new values ​​on date
    dataValues.push(newValue);

    //This variable will store the string that will represent the XML file
    const xmlString = objectToXml(newValue);

    try {
      //Creating a project in bling with the information that came from pipedrive
      createNewProduct(apiKeyBling, xmlString);
    } catch (err) {
      res.status(500).json({ error: err });
    }

    //Values ​​being included in mongodb
    const newValueCollection = new opportunityModel(newValue);

    //Saving the information added to mongodb
    try {
      newValueCollection.save();
      console.log(`This value was successfully added: ${newValueCollection}`);
    } catch {
      console.log("Failed to try to add a new value in mongodb");
    }
  });

  //returning as created if everything goes as expected
  res.status(201).json({ status: "Success", data: dataValues });
});

//Route to get information inside mongodb
app.get("/collectionsValues", async (req, res) => {
  //Fetching collection information within mongodb
  const opportunity = await opportunityModel.find({});

  // Returns the mongo information if everything goes as expected
  try {
    res.status(200).json({ status: "Success", data: opportunity });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = app;
