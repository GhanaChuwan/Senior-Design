const challenges = require('../models/challenges');
const activityList = require('../models/activity');
const User = require("../models/user");

exports.getStreak = (req, res) => {
    // try {
    //     return res.status(200);
    // } catch (error) {
    //     console.log("streak error");
    // }
}
exports.getDays = (req, res) => {
    // // console.log("get days");
    // // console.log(userId);
    // try {

    //     return res.status(200);
    // } catch (error) {
    //     console.log("days error");
    // }
}

exports.createChallenges = async (user) => {

    try {
        //create challenges for new user
        console.log("creating challenges");
        const challenge1 = await challenges.create({
            category: "read",
            emblem: "book-open",
            description: "study for 5 hours ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 300
        })
        const challenge2 = await challenges.create({
            category: "note",
            emblem: "book-open",
            description: "take notes for 5 hours ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 300
        })

        const challenge3 = await challenges.create({
            category: "work",
            emblem: "book-open",
            description: "spend 10 hours on course assignments ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 600
        })

        const challenge4 = await challenges.create({
            category: "lab",
            emblem: "book-open",
            description: "spend 8 hours on course labs ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 480
        })

        const challenge5 = await challenges.create({
            category: "tutor",
            emblem: "book-open",
            description: "spend 2 hours in tutoring ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 120
        })

        user.challenges.push(challenge1, challenge2, challenge3, challenge4, challenge5);
        user.save();

        console.log(user);
    } catch (error) {
        console.log("get challenges error");
    }
}



exports.getChallenges = async (req, res) => {
    const { userId } = req.body;
    try {
        console.log("get challenges");
        const user = await User.findById(userId.user._id);
        const challengeList = await challenges.find({ createdBy: user._id });


        return res.status(200).json(challengeList);
    } catch (error) {
        console.log("get challenges error");
    }
}

exports.updateChallenges = async (req, res) => {
    const { activity, time, userId } = req.body;

    try {
        console.log("updating challenges");
        const activitySearchUP = await activityList.findById(activity);
        const user = await User.findById(userId.user._id);
        const challengeList = await challenges.find({ createdBy: user._id });

        for (let i = 0; i < challengeList.length; i++) {
            switch (challengeList[i].category) {
                case "read":
                    //update read challenge
                    break;
                case "note":
                    //update note challenge
                    break;
                case "tutor":
                    //update tutoring challenge
                    break;
                default:
                    //update work challenge
                    break;

            }
        }


    } catch (error) {
        console.log("error occured when updating challenges ");
    }
}

