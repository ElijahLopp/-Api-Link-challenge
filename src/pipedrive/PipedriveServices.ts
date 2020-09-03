//Import of node modules
const libPipedriveInst = require("pipedrive");

//import of environment variables
require("dotenv/config");

//Accessing the Pipedrive API
libPipedriveInst.Configuration.apiToken = `${process.env.TOKEN_PIPEDRIVE}`;

module.exports = libPipedriveInst;
