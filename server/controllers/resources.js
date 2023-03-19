const challenges = require('../models/challenges');
const Resources = require('../models/resources');
const activityList = require('../models/activity');

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
