const challenges = require("../models/challenges");
const activityList = require("../models/activity");
const User = require("../models/user");

exports.getStreak = (req, res) => {
  // try {
  //     return res.status(200);
  // } catch (error) {
  //     console.log("streak error");
  // }
};
exports.getDays = (req, res) => {
  // // console.log("get days");
  // // console.log(userId);
  // try {
  //     return res.status(200);
  // } catch (error) {
  //     console.log("days error");
  // }
};

exports.createChallenges = async (user) => {
  try {
    //create challenges for new user
    console.log("creating challenges");
    const challenge1 = await challenges.create({
      category: "read",
      emblem: "book",
      description: "Study lecture material ",
      completed: false,
      createdBy: user._id,
      currentAmount: 0,
      totalAmount: 180000,
      badges: 0,
    });
    const challenge2 = await challenges.create({
      category: "read with friends",
      emblem: "user-friends",
      description: "Study with friends",
      completed: false,
      createdBy: user._id,
      currentAmount: 0,
      totalAmount: 36000,
      badges: 0,
    });
    const challenge3 = await challenges.create({
      category: "note",
      emblem: "sticky-note",
      description: "Review notes in courses ",
      completed: false,
      createdBy: user._id,
      currentAmount: 0,
      totalAmount: 180000,
      badges: 0,
    });

    const challenge4 = await challenges.create({
      category: "work",
      emblem: "chalkboard",
      description: "Work on course assignments ",
      completed: false,
      createdBy: user._id,
      currentAmount: 0,
      totalAmount: 180000,
      badges: 0,
    });

    user.challenges.push(
      challenge1._id,
      challenge2._id,
      challenge3._id,
      challenge4._id
    );
    await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    console.log(user);
  } catch (error) {
    console.log("get challenges error");
  }
};

exports.getChallenges = async (req, res) => {
  const { userId } = req.user;
  try {
    console.log("get challenges");
    const user = await User.findById(userId);
    const challengeList = await challenges.find({ createdBy: user._id });
    console.log(challengeList);
    return res.status(200).json(challengeList);
  } catch (error) {
    console.log("get challenges error");
  }
};

exports.updateChallenges = async (req, res) => {
  const { activity, time } = req.body;
  const { userId } = req.user;

  try {
    console.log("updating challenges");
    const activitySearchUP = await activityList.findById(activity);
    const user = await User.findById(userId.user._id);
    const challengeList = await challenges.find({ createdBy: user._id });

    console.log(activitySearchUP.name);

    switch (activitySearchUP.name) {
      case "reading":
        var challenge = await challenges.findById(challengeList[0]);
        console.log(challenge.category);
        challenge.currentAmount += time;
        if (challenge.completed != true) {
          if (challenge.currentAmount >= challenge.totalAmount) {
            challenge.completed = true;
            challenge.badges += 1;
          }
        }
        challenge.save();
        break;

      case "study with a friend":
        var challenge = await challenges.findById(challengeList[1]);
        console.log(challenge.category);
        challenge.currentAmount += time;
        if (challenge.completed != true) {
          if (challenge.currentAmount >= challenge.totalAmount) {
            challenge.completed = true;
            challenge.badges += 1;
          }
        }
        challenge.save();
        break;

      case "reviewing notes":
        var challenge = await challenges.findById(challengeList[2]);
        console.log(challenge.category);
        challenge.currentAmount += time;
        if (challenge.completed != true) {
          if (challenge.currentAmount >= challenge.totalAmount) {
            challenge.completed = true;
            challenge.badges += 1;
          }
        }
        challenge.save();
        break;
      default: //work challenges
        var challenge = await challenges.findById(challengeList[3]);
        console.log(challenge.category);
        challenge.currentAmount += time;
        if (challenge.completed != true) {
          if (challenge.currentAmount >= challenge.totalAmount) {
            challenge.completed = true;
            challenge.badges += 1;
          }
        }
        challenge.save();
        break;
    }

    console.log("challenge updated");
  } catch (error) {
    console.log("error occured when updating challenges ");
  }
};
