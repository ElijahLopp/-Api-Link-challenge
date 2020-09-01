const libPipedrive = require("pipedrive");
const { User } = require("pipedrive");
require("dotenv/config");

libPipedrive.Configuration.apiToken = `${process.env.TOKEN_PIPEDRIVE}`;

module.exports = libPipedrive;
