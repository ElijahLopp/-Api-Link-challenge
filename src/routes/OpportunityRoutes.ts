//Import of node modules
const express = require("express");
//Import of created files
const opportunityModel = require("../models/OpportunityModel");
const libPipedrive = require("../pipedrive/PipedriveServices");
import objectToXml from "../util/objectToXml";
import createNewProduct from "../services/createNewProduct";

require("dotenv/config");

const app = express();

app.get("/pipedrive", async (req, res) => {
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

    try {
      newValueCollection.save();
      console.log(`This value was successfully added: ${newValueCollection}`);
    } catch {
      console.log("Failed to try to add a new value in mongodb");
    }
  });

  res.status(201).json({ messege: "created" });
});

app.get("/opportunitys", async (req, res) => {
  const opportunity = await opportunityModel.find({});

  try {
    res.status(200).json(opportunity);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = app;
