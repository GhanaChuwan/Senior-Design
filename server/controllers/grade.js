const Grade = require("../models/grade");
const Subject = require("../models/subject");
const User = require("../models/user");
exports.createGrade = async (req, res) => {
  const { gradeName, gradeType, gradePoints, subjectId } = req.body;
  const { userId } = req.user;

  try {
    const subject = await Subject.findById(subjectId);

    if (subject != null) {
      const grade = await Grade.create({
        gradeName,
        gradeType,
        gradePoints,
        createdBy: userId,
      });

      subject.grades.push(grade._id);
      await Subject.findByIdAndUpdate(subjectId, subject, { new: true });
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
exports.getAllGrades = async (res, req) => {
  const { subjectId } = req.body;

  try {
    let grades = [];
    const subject = await Subject.findById(subjectId);

    for (let i = 0; i < subject.grades.length; i++) {
      const a = await Grade.findById(subject.grades[i]);
      grades.push(a);
    }

    return res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
