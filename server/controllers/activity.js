const Activity = require("../models/activity");
const Subject = require("../models/subject");
const ActivitySession = require("../models/activitySessions");
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

exports.addActivitySession = async (req, res) => {
  const { note, time, activityId } = req.body;
  const { userId } = req.user;

  try {
    const activity = await Activity.findById(activityId);

    const activitySession = await ActivitySession.create({
      note,
      time,
      createdBy: userId,
    });

    activity.activitySessionTime.push(activitySession._id.toString());
    activity.save();
    return res.status(201).json(activitySession);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllActivitySession = async (req, res) => {
  const { activityId } = req.body;
  const { userId } = req.user;
  try {
    let activitySession = [];
    const activity = await Activity.findById(activityId);

    console.log(activity);

    for (let i = 0; i < activity.activitySessionTime.length; i++) {
      const session = await ActivitySession.findById(
        activity.activitySessionTime[i]
      );
      activitySession.push(session);
    }

    let totalTime = 0;

    activitySession.forEach((session) => {
      totalTime += session.time;
    });

    return res
      .status(200)
      .json({ activites: activitySession, totalTime: totalTime });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
