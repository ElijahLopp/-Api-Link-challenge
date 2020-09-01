const express = require("express");
const opportunityModel = require("../models/OpportunityModel");
const libPipedrive = require("../pipedrive/PipedriveServices");
const app = express();

libPipedrive;

app.get("/pipedrive", async (req, res) => {
  var input = [];
  input["status"] = "won";
  input["phone"];
  const user = await libPipedrive.DealsController.getAllDeals(input);

  res.send(user);
});

app.get("/opportunitys", async (req, res) => {
  const opportunity = await opportunityModel.find({});

  try {
    res.status(200).json(opportunity);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/opportunitys", async (req, res) => {
  const opportunity = new opportunityModel(req.body);

  try {
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = app;
