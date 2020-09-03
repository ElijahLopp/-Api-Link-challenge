//Import of node modules
const mongoosee = require("mongoose");

//Build schemas
const OpportunitySchema = new mongoosee.Schema({
  opportunity: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  date: {
    type: String,
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

const opportunity = mongoosee.model("Opportunity", OpportunitySchema);
module.exports = opportunity;
