let converter = require("json-2-csv");
const fs = require("fs");

exports.downloadProgress = async (req, res) => {
  // let collection = ["subjects", "activities", "grades"];
  let options = {
    delimiter: {
      wrap: '"', // Double Quote (") character
      field: ",", // Comma field delimiter
      eol: "\n", // Newline delimiter
    },
    prependHeader: true,
    sortHeader: false,
    excelBOM: true,
    trimHeaderValues: true,
    trimFieldValues: true,
    keys: [
      "Make",
      "Model",
      "Year",
      "Specifications.Mileage",
      "Specifications.Trim",
    ],
  };

  // let documents = [
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
  // ];

  let json2csvCallback = function (err, csv) {
    if (err) throw err;
    fs.writeFile("Car.csv", csv, function (err) {
      if (err) throw err;
      console.log("CSV file saved.");
      res.attachment("Car.csv");
      res.status(200).send(documents);
    });
  };
  converter.json2csv(documents, json2csvCallback, options);
};
