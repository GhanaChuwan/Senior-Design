const Grade = require("../models/grade");
const Subject = require("../models/subject");
const User = require("../models/user");

exports.createGrade = async (req, res) => {
  const { gradeName, gradeType, gradePoints, subjectId } = req.body;
  const { userId } = req.user;

  try {
    // const subjectID = await Subject.findOne({
    //   name: subjectId,
    //   createdBy: userId,
    // });

    const subject = await Subject.findById(subjectId);

    if (subject != null) {
      const grade = await Grade.create({
        gradeName,
        gradeType,
        gradePoints,
        createdBy: userId,
      });

      subject.grades.push(grade._id.toString());
      subject.save();
      return res.status(201).json(grade);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "failed to create Grade" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.getAllGrades = async (req, res) => {
  const { subjectId } = req.body;
  const { userId } = req.user;
  try {
    let grades = [];
    const subjectID = await Subject.findOne({
      name: subjectId,
      createdBy: userId,
    });
    const subject = await Subject.findById(subjectID._id.toString());

    for (let i = 0; i < subject.grades.length; i++) {
      const a = await Grade.findById(subject.grades[i]);
      grades.push(a);
    }
    return res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  const { subjectId, grade } = req.body;
  const { userId } = req.user;
  const grades = [];
  try {
    const subjectID = await Subject.findOne({
      name: subjectId,
      createdBy: userId,
    });
    const subject = await Subject.findById(subjectID._id.toString());

    await Grade.findByIdAndDelete(grade._id);

    for (let i = 0; i < subject.grades.length; i++) {
      if (subject.grades[i] == grade._id) {
        subject.grades.splice(i, 1);
      }
    }
    console.log(subject.grades);

    subject.save();
    return res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
