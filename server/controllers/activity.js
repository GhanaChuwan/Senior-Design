const Activity = require("../models/activity");
const Subject = require("../models/subject");
const User = require("../models/user");

exports.createActivity = async (req, res) => {
  const { name, color, description, subjectId } = req.body;
  const { userId } = req.user;

  try {
    const subject = await Subject.findById(subjectId);

    if (subject != null) {
      const activity = await Activity.create({
        name,
        color,
        description,
        createdBy: userId,
        createdAt: Date.now(),
      });

      subject.activities.push(activity._id);
      await Subject.findByIdAndUpdate(subjectId, subject, {
        new: true,
      });
      return res.status(201).json(activity);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "failed to create activity" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  const { subjectId, activityId } = req.body;
  console.log({ subjectId, activityId });
  const { userId } = req.user;
  try {
    const subject = await Subject.findById(subjectId);
    subject.activities.splice(subject.activities.indexOf(activityId), 1);
    await Subject.findByIdAndUpdate(subjectId, subject, {
      new: false,
    });

    const activities = await Activity.findByIdAndDelete(activityId);
    return res.status(200).json(activities);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

exports.getAllActivity = async (req, res) => {
  const { subjectId } = req.params;

  try {
    let activities = [];
    const subject = await Subject.findById(subjectId);

    for (let i = 0; i < subject.activities.length; i++) {
      const a = await Activity.findById(subject.activities[i]);
      activities.push(a);
    }

    return res.status(200).json(activities);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

exports.getActivity = async (req, res) => {
  const { activityId } = req.body;
  const { userId } = req.user;
  try {
    const activities = await Activity.findById(activityId);
    return res.status(200).json(activities);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
