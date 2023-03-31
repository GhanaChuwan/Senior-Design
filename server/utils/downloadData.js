const csvDownload = require("json-to-csv-export");
// const fs = require("fs");
// const User = require("../models/user");

const downloadProgress = async () => {
  // let collection = ["subjects", "activities", "grades"];

  const ipAddressesData = [
    {
      id: "1",
      name: "Sarajane Wheatman",
      ip: "40.98.252.240",
    },
    {
      id: "2",
      name: "Linell Humpherston",
      ip: "82.225.151.150",
    },
  ];

  const dataToConvert = {
    data: ipAddressesData,
    filename: "ip_addresses_report",
    delimiter: ",",
    headers: ["IP", "Full Name", "IP Address"],
  };
  csvDownload(dataToConvert);

  // const { userId } = req.user;
  // try {
  //   let subjects = [];

  //   const userData = await User.findById(userId);

  //   let users = userData.map((data) => {
  //     const { firstName, lastName, email } = data;
  //     return { firstName, lastName, email };
  //   });

  //   let json2csvCallback = function (err, csv) {
  //     if (err) throw err;
  //     fs.writeFile("progress.csv", csv, function (err) {
  //       if (err) throw err;
  //       console.log("CSV file saved.");
  //       res.attachment("progress.csv");
  //       res.status(200).send(documents);
  //     });
  //   };
  //   converter.json2csv(documents, json2csvCallback, options);
  // } catch (error) {
  //   res.send({ status: 400, success: false, msg: error.message });
  // }

  // let json2csvCallback = function (err, csv) {
  //   if (err) throw err;
  //   fs.writeFile("Car.csv", csv, function (err) {
  //     if (err) throw err;
  //     console.log("CSV file saved.");
  //     res.attachment("Car.csv");
  //     res.status(200).send(documents);
  //   });
  // };
  // converter.json2csv(documents, json2csvCallback, options);
};

/*// let documents = [
  //   {
  //     Make: "Nissan",
  //     Model: " Murano ", // Note: This value has additional padding which can be trimmed
  //     Year: "2013",
  //     Specifications: {
  //       Mileage: "7,106",
  //       Trim: "", // Note: This value has been changed from the previous example
  //     },
  //   },
  //   {
  //     Make: "BMW",
  //     Model: "X5",
  //     Year: "2014",
  //     Specifications: {
  //       Mileage: "3,287",
  //       Trim: "M",
  //     },
  //   },
  // ]; */

downloadProgress();
exports.downloadProgress = downloadProgress;
