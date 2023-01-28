const Activity = require('../models/activity')

exports.createActivity = async (req, res) =>{
    const activity = req.body;
    const newActivity = new Activity({
        ...activity,
        creator:req.userId,
        createdAt:new Date().toISOString(),
    });
    try{
        await newActivity.save();
        res.status(201).json(newActivity)
    }catch (error) {
        res.status(409).json({message:error.message})
    }
}