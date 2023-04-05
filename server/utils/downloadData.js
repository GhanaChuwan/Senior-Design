const csvDownload = require("json-to-csv-export");
const fs = require("fs");
const Subject = require("../models/subject");
const User = require("../models/user");
const downloadProgress = async () => {
  const { userId } = req.user;
  let subjects = [];
  var userData = await Subject.find({ createdBy: userId });

  userData.map((user) => {
    const { id, name, activities, grades } = user;
    subjects.push({ id, name, activities, grades });
  });

  // const ipAddressesData = [
  //   {
  //     id: "1",
  //     name: "Sarajane Wheatman",
  //     ip: "40.98.252.240",
  //   },
  //   {
  //     id: "2",
  //     name: "Linell Humpherston",
  //     ip: "82.225.151.150",
  //   },
  // ];

  const dataToConvert = {
    data: userData,
    filename: "progress. csv",
    delimiter: ",",
    headers: ["id", "name", "activities", "grades"],
  };
  const csvData = csvDownload(dataToConvert);

  fs.writeFile(dataToConvert.filename, csvData, (err) => {
    // write CSV data to file
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${dataToConvert.filename} has been saved.`);
  });
};

module.exports = {
  downloadProgress: downloadProgress,
};
