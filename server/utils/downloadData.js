const csvDownload = require("json-to-csv-export");
const fs = require("fs");
const Subject = require("../models/subject");
const User = require("../models/user");
const Parser = require("@json2csv/plainjs").Parser;
var jsonexport = require("jsonexport");

const downloadProgress = (finalData) => {
  var data = [...finalData];

  try {
    const parser = new Parser();
    const csv = parser.parse(data);

    data = jsonexport(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeCsvData: downloadProgress,
};
