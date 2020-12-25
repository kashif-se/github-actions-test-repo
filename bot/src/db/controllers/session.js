const mongoose = require("mongoose");
const Session = require("../models/sessionModel");

exports.getAllSessionsCount = async () => {
  console.log("getAllSessionsCount");
  try {
    return await Session.find({}).count().exec();
  } catch (error) {
    console.log(error);
  }
};
