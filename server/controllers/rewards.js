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
            totalAmount: 18000
        })
        const challenge2 = await challenges.create({
            category: "note",
            emblem: "book-open",
            description: "take notes for 5 hours ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 18000
        })

        const challenge3 = await challenges.create({
            category: "work",
            emblem: "book-open",
            description: "spend 10 hours on course assignments ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 36000
        })

        const challenge4 = await challenges.create({
            category: "lab",
            emblem: "book-open",
            description: "spend 8 hours on course labs ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 28800
        })

        const challenge5 = await challenges.create({
            category: "tutor",
            emblem: "book-open",
            description: "spend 2 hours in tutoring ",
            completed: false,
            createdBy: user._id,
            currentAmount: 0,
            totalAmount: 7200
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

        console.log(activitySearchUP.name);


        switch (activitySearchUP.name) {
            case "reading":
                var challenge = await challenges.findById(challengeList[0]);
                console.log(challenge.category)
                challenge.currentAmount += time;
                if (challenge.currentAmount >= challenge.totalAmount) {
                    challenge.completed = true;
                }
                challenge.save();
                break;

            case "reviewing notes":
                var challenge = await challenges.findById(challengeList[1]);
                console.log(challenge.category)
                challenge.currentAmount += 18000;
                if (challenge.currentAmount >= challenge.totalAmount) {
                    challenge.completed = true;
                }
                challenge.save();
                break;

            case "go to tutoring":
                var challenge = await challenges.findById(challengeList[4]);
                console.log(challenge.category)
                challenge.currentAmount += time;
                if (challenge.currentAmount >= challenge.totalAmount) {
                    challenge.completed = true;
                }
                challenge.save();
                break;
            default: //work challenges
                var challenge = await challenges.findById(challengeList[2]);
                console.log(challenge.category)
                challenge.currentAmount += time;
                if (challenge.currentAmount >= challenge.totalAmount) {
                    challenge.completed = true;
                }
                challenge.save();
                break;
        }


        // //reading challenge
        // if (challenge.category == "read" && activitySearchUP.name == "reading") {
        //     console.log(challenge.category)
        //     challenge.currentAmount += time;
        //     if (challenge.currentAmount >= challenge.totalAmount) {
        //         challenge.completed = true;
        //     }
        //     challenge.save();
        //     break;
        // }
        // //notes challenge
        // if (challenge.category == "note" && activitySearchUP.name == "reviewing notes") {
        //     console.log(challenge.category)
        //     challenge.currentAmount += time;
        //     if (challenge.currentAmount >= challenge.totalAmount) {
        //         challenge.completed = true;
        //     }
        //     challenge.save();
        //     break;
        // }
        // //tutoring challenge
        // if (challenge.category == "tutor" && activitySearchUP.name == "go to tutoring") {
        //     console.log(challenge.category)
        //     challenge.currentAmount += time;
        //     if (challenge.currentAmount >= challenge.totalAmount) {
        //         challenge.completed = true;
        //     }
        //     challenge.save();
        //     break;
        // }
        // //work challenge
        // if (activitySearchUP.name != "reading" && activitySearchUP.name != "notes" && activitySearchUP.name != "go to tutoring") {
        //     console.log(challenge.category)
        //     challenge.currentAmount += time;
        //     if (challenge.currentAmount >= challenge.totalAmount) {
        //         challenge.completed = true;
        //     }
        //     challenge.save();
        //     break;
        // }

        console.log("challenge updated");

    } catch (error) {
        console.log("error occured when updating challenges ");
    }
}

