const csvDownload = require("json-to-csv-export");
const fs = require("fs");
const Subject = require("../models/subject");
const User = require("../models/user");
const Parser = require("@json2csv/plainjs").Parser;
var jsonexport = require("jsonexport");

const downloadProgress = (callback) => {
  var data = [
    {
      subject: "Test 1",
      grades: [
        {
          name: "Test 2",
          gradeType: "Exams",
          gradePoint: "10/100",
        },
        {
          name: "Test 3",
          gradeType: "Hoemwork",
          gradePoint: "10/100",
        },
        {
          name: "Test 4",
          gradeType: "Quizzes",
          gradePoint: "10/100",
        },
      ],
      activities: [
        {
          name: "answering questions",
          totalTime: 2,
          activitySessionTime: [
            {
              note: "asdasd",
              time: 30,
            },
            {
              note: "asdasd",
              time: 30,
            },
            {
              note: "asdasd",
              time: 30,
            },
          ],
        },
      ],
    },
  ];

  try {
    const parser = new Parser();
    const csv = parser.parse(data);

    data = jsonexport(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

downloadProgress();

module.exports = {
  makeCsvData: downloadProgress,
};
