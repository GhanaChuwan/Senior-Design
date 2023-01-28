const Resources = require('../models/resources');

exports.resources = async(req, res) => {
    const resource = req.body;
    const newResource = new Resources({
        ...resource,
    });

    try
    {
        await newResource.save();
        res.status(201).json(newResource)
    } catch (error)
    {
        res.status(409).json({message:error.message});
    }
}

