const Calendar = require("../models/calendar");
const User = require("../models/user");

exports.createEvents = async (req, res) => {
  const { title, date, note } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    const calendar = await Calendar.create({
      title,
      date,
      note,
      createdBy: userId,
    });

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
  const { userId } = req.user;
  try {
    const calendar = await Calendar.find({ createdBy: userId });
    return res.status(200).json(calendar);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
exports.deleteEvents = async (req, res) => {
  const { calendarId } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(req.user.userId);

    user.calendars.splice(user.calendars.indexOf(calendarId), 1);

    await User.findByIdAndUpdate(req.user.userId, user, {
      new: false,
    });

    const calendar = await Calendar.findByIdAndDelete(calendarId);

    return res.status(200).json(calendar);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
