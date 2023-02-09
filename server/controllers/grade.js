const Grade = require('../models/grade')

exports.createGrade = async (req, res) => {
    const grade = req.body;
    const newGrade = new Grade({
        ...grade,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await newGrade.save();
        res.status(201).json(newGrade)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}