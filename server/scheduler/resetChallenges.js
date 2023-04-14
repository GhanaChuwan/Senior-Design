var cron = require('node-cron');

const User = require("../models/user");
const Challenges = require("../models/challenges");


const resetChallenges = async () => {
    console.log("resetting challenges");
    let user = await User.find({});

    user.forEach((user) => {
        user.challenges.forEach(async (challengeId) => {
            let challenge = await Challenges.findById(challengeId);
            challenge.currentAmount = 0;
            challenge.save();
        })
    })

};
// resets challenges every Sunday at 11:59 am
cron.schedule('59 11 * * 0', resetChallenges);
//cron.schedule('*/30 * * * * *', resetChallenges);
