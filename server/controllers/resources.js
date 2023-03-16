const Resources = require('../models/resources');

exports.resources = async (req, res) => {
    const resource = req.body;
    const newResource = new Resources({
        ...resource,
    });

    try {
        await newResource.save();
        res.status(201).json(newResource)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.getStreak = (req, res) => {
    try {
        return res.status(200);
    } catch (error) {
        console.log("streak error");
    }
}
exports.getDays = (req, res) => {
    console.log("get days");
    try {

        return res.status(200);
    } catch (error) {
        console.log("days error");
    }
}
exports.getChallenges = (req, res) => {
    console.log("get challenges");
    try {
        return res.status(200);
    } catch (error) {
        console.log("challenges error");
    }
}

