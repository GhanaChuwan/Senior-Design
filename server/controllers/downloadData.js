let converter = require("json-2-csv");
const fs = require("fs");

exports.downloadProgress = async (req, res) => {
  let collection = ["subjects", "activities", "grades"];
  try {
    let json2csvfunction = function (err, csv) {
      if (err) throw err;
      console.log(csv);
    };
    converter.json2csv(collection, json2csvfunction);
  } catch (error) {
    console.error(error);
  }
};
