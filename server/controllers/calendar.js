const User = require("../models/user");
const Calendar = require("../models/calendar");
exports.createEvents = async (req, res) => {
  const { eventName, eventNote, eventDate } = req.body;
  const { userId } = req.user

  try {
    const user = await User.findById(userId);

    console.log("test");
    console.log(eventName);
    console.log(eventNote);
    console.log(eventDate);

    console.log(user);
    calendar = await Calendar.create({
      eventName,
      eventNote,
      eventDate,
      createdBy: userId,
    });
    calendar.save();
    user.calendars.push(calendar._id);
    await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    return res.status(201).json(calendar);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  const { userId } = req.user
  try {
    console.log("test")
    const user = await User.findById(userId);
    console.log("getting events");
    const calendar = await Calendar.find({ createdBy: userId });
    //console.log(calendar);
    return res.status(200).json(calendar);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
exports.deleteEvents = async (req, res) => {
  const { event } = req.body;
  const { userId } = req.user


  try {
    console.log("deleting events");
    const user = await User.findById(userId);
    user.calendars.splice(user.calendars.indexOf(event._id), 1);

    await User.findByIdAndUpdate(req.user.userId, user, {
      new: false,
    });

    const calendar = await Calendar.findByIdAndDelete(event._id);

    const eventList = await Calendar.find({ createdBy: userId });
    console.log("remaining events ------------------------------------------")
    console.log(eventList);

    res.status(200).json(eventList);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
