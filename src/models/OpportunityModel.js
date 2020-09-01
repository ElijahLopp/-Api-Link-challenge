const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  opportunity: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative values ​​aren't valid");
    },
  },
});

const opportunity = mongoose.model("Opportunity", OpportunitySchema);
module.exports = opportunity;
