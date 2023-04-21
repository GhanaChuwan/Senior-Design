const { makeCsvData } = require("../utils/downloadData.js");
const emailSender = require("../utils/sendDownloadMail.js");
const User = require("../models/user.js");
const Subject = require("../models/subject.js");
const Grade = require("../models/grade.js");
const Activity = require("../models/activity.js");
const ActivitySessions = require("../models/activitySessions.js");

exports.downloadProgressLink = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    const finalData = [];

    for (let i = 0; i < user.subjects.length; i++) {
      let tempData = {};
      const subject = await Subject.findById(user.subjects[i]);
      tempData = { name: subject.name };
      tempData["grades"] = [];
      tempData["activities"] = [];

      //grades
      for (let j = 0; j < subject.grades.length; j++) {
        const grade = await Grade.findById(subject.grades[j]);
        tempData.grades.push({
          name: grade.name,
          gradeType: grade.gradeType,
          gradePoint: grade.gradePoint,
        });
      }

      for (let k = 0; k < subject.activities.length; k++) {
        const activity = await Activity.findById(subject.activities[k]);

        let sessionTemp = {
          name: activity.name,
          totalTime: activity.totalTime,
          activitySession: null,
        };

        const myData = [];
        for (let l = 0; l < activity.activitySessionTime.length; l++) {
          const activitySession = await ActivitySessions.findById(
            activity.activitySessionTime[l]
          );

          myData.push({
            note: activitySession.note,
            time: activitySession.time,
          });
        }

        sessionTemp.activitySession = myData;

        tempData.activities.push({ ...sessionTemp });
      }
      finalData.push(tempData);
    }

    const data = await makeCsvData(finalData);

    const didSend = await emailSender.sendDownloadMail(user.email, data);
    if (didSend) {
      return res.status(200).json({
        email: user.email,
        message: "Progress files sent to your email account",
      });
    } else {
      return res.status(400).json({
        message: " Progress files link was not sent.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
