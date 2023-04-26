const challenges = require("../../models/challenges");
const User = require("../../models/user");
const {
    getStreak,
    getDays,
    createChallenges,
    getChallenges,
    updateChallenges
} = require("./your-module");

// Mocked data for testing
const user = {
    _id: "user_id",
    challenges: []
};
const activity = {
    _id: "activity_id",
    name: "reading"
};

jest.mock("../../models/challenges", () => ({
    create: jest.fn().mockResolvedValue({ _id: "challenge_id" }),
    find: jest.fn().mockResolvedValue([])
}));
jest.mock("../../models/activity", () => ({
    findById: jest.fn().mockResolvedValue(activity)
}));
jest.mock("../../models/user", () => ({
    findById: jest.fn().mockResolvedValue(user),
    findByIdAndUpdate: jest.fn().mockResolvedValue(user)
}));


describe("createChallenges", () => {
    test("should create challenges and update user's challenges", async () => {
        const result = await createChallenges(user);

        expect(challenges.create).toHaveBeenCalledTimes(4);
        expect(user.challenges).toEqual([
            "challenge_id",
            "challenge_id",
            "challenge_id",
            "challenge_id"
        ]);
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(user._id, user, {
            new: true
        });
    });

    test("should log error when creating challenges", async () => {
        challenges.create.mockRejectedValueOnce(new Error("create error"));
        console.log = jest.fn();

        await createChallenges(user);

        expect(console.log).toHaveBeenCalledWith("get challenges error");
    });
});

describe("getChallenges", () => {
    test("should get user's challenges", async () => {
        const req = { user: { userId: "user_id" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getChallenges(req, res);

        expect(challenges.find).toHaveBeenCalledWith({ createdBy: user._id });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    test("should log error when getting challenges", async () => {
        challenges.find.mockRejectedValueOnce(new Error("find error"));
        console.log = jest.fn();
        const req = { user: { userId: "user_id" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getChallenges(req, res);

        expect(console.log).toHaveBeenCalledWith("get challenges error");
    });
});


describe('updateChallenges function', () => {
    it('should update the challenge for a reading activity', async () => {
        const mockActivity = {
            _id: 'activity1',
            name: 'reading',
        };
        const mockUser = {
            _id: 'user1',
        };
        const mockChallengeList = [
            { _id: 'challenge1', currentAmount: 0, totalAmount: 10, completed: false },
            { _id: 'challenge2', currentAmount: 0, totalAmount: 20, completed: false },
            { _id: 'challenge3', currentAmount: 0, totalAmount: 30, completed: false },
            { _id: 'challenge4', currentAmount: 0, totalAmount: 40, completed: false },
        ];

        const req = {
            body: { activity: mockActivity._id, time: 5 },
            user: { userId: mockUser._id },
        };
        const res = {};
        const activityList = { findById: jest.fn(() => mockActivity) };
        const User = { findById: jest.fn(() => mockUser) };
        const challenges = {
            find: jest.fn(() => mockChallengeList),
            findById: jest.fn(() => mockChallengeList[0]),
        };
        const saveSpy = jest.spyOn(mockChallengeList[0], 'save');

        await updateChallenges(req, res, {
            activityList,
            User,
            challenges,
        });

        expect(challenges.findById).toHaveBeenCalledWith(mockChallengeList[0]._id);
        expect(mockChallengeList[0].currentAmount).toBe(5);
        expect(saveSpy).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        const req = {};
        const res = {};
        const activityList = { findById: jest.fn() };
        const User = { findById: jest.fn() };
        const challenges = { find: jest.fn(), findById: jest.fn() };
        const consoleSpy = jest.spyOn(console, 'log');

        await updateChallenges(req, res, {
            activityList,
            User,
            challenges,
        });

        expect(consoleSpy).toHaveBeenCalledWith('error occured when updating challenges ');
    });
});

