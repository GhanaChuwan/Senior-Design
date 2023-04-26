const Grade = require("../../models/grade");
const Subject = require("../../models/subject");
const User = require("../../models/user");

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
    // const subjectID = await Subject.findOne({
    //   name: subjectId,
    //   createdBy: userId,
    // });
    const subject = await Subject.findById(subjectId);

    for (let i = 0; i < subject.grades.length; i++) {
      const a = await Grade.findById(subject.grades[i]);
      if (a != null)
        grades.push(a);
    }
    console.log(grades);
    return res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  const { subjectId, grade } = req.body; //get subject and grade from clientside
  const { userId } = req.user; //get user token
  try {
    const subjectID = await Subject.findOne({ //find subjectID by subject and grade from database
      name: subjectId,
      createdBy: userId,
    });
    const subject = await Subject.findById(subjectID._id.toString()); //get subject from database

    await Grade.findByIdAndDelete(grade._id); //find grade and delete from database

    for (let i = 0; i < subject.grades.length; i++) { //loop through list of grades in subject
      if (subject.grades[i] == grade._id) { //if grade = grade in list
        subject.grades.splice(i, 1); //remove grade from list
      }
    }
    let gradeList = [];
    for (let i = 0; i < subject.grades.length; i++) { //loop through updated list of grades in subject 
      gradeList[i] = await Grade.findById(subject.grades[i]); //add each grade to gradelist 
    }
    console.log(gradeList);

    subject.save(); //update subject in database
    return res.status(200).json(gradeList); //return updated list of grades to clientside 
  } catch (error) {
    res.status(400).json({ success: false, message: error.message }); //return error message
  }
};

