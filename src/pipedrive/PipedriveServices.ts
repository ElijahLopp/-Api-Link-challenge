const libPipedriveInst = require("pipedrive");
require("dotenv/config");

libPipedriveInst.Configuration.apiToken = `${process.env.TOKEN_PIPEDRIVE}`;

module.exports = libPipedriveInst;
