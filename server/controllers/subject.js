const Subject = require("../models/subject");
const User = require("../models/user");
const Activitiy = require("../models/activity");

exports.createSubject = async (req, res) => {
  const { name, color } = req.body;
  const { userId } = req.user;

  console.log(color);
  console.log("userId", userId);
  try {
    const user = await User.findById(userId);

    const subject = await Subject.create({
      name,
      color,
      createdBy: userId,
    });
    console.log(subject);

    user.subjects.push(subject._id);
    await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    return res.status(201).json(subject);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  const { userId } = req.user;
  try {
    const subjects = await Subject.find({ createdBy: userId });
    return res.status(200).json(subjects);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

exports.deleteSubjects = async (req, res) => {
  const { subjectId } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(req.user.userId);

    user.subjects.splice(user.subjects.indexOf(subjectId), 1);

    await User.findByIdAndUpdate(req.user.userId, user, {
      new: false,
    });

    const subject = await Subject.findByIdAndDelete(subjectId);

    subject.activities.forEach(
      async (id) => await Activitiy.findByIdAndDelete(id)
    );

    return res.status(200).json(subject);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
