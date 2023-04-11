const express = require("express");
const router = express.Router();

const {
  createUser,
  userSignIn,
  forgotPassword,
  forgotPasswordUI,
  resetPassword,
  changePassword,
} = require("../controllers/user.js");

const { isAuth } = require("../middlewares/validation/auth");
const {
  validateUsersSignUp,
  userValidation,
  validateUsersSignIn,
} = require("../middlewares/validation/user");
const {
  validateSubject,
} = require("../middlewares/validation/subjectValidation");
const {
  createSubject,
  getSubjects,
  deleteSubjects,
} = require("../controllers/subject");
const {
  validateActivity,
} = require("../middlewares/validation/activityValidation");
const {
  createActivity,
  getActivity,
  deleteActivity,
  getAllActivity,
  addActivitySession,
  getAllActivitySession,
  getWeeklyProgress,
  getMonthlyProgress,
} = require("../controllers/activity");
const {
  validateResources,
} = require("../middlewares/validation/resourcesValidation");
const { resources } = require("../controllers/resources");
const {
  createGrade,
  getAllGrades,
  deleteGrade,
} = require("../controllers/grade");

const {
  createEvents,
  getEvents,
  deleteEvents,
} = require("../controllers/calendar");

const {
  getStreak,
  getDays,
  getChallenges,
  updateChallenges,
} = require("../controllers/rewards");

const { downloadProgressLink } = require("../controllers/downloadProgess");

router.post("/create-user", validateUsersSignUp, userValidation, createUser);
router.post("/sign-in", validateUsersSignIn, userValidation, userSignIn);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:userID/:token", forgotPasswordUI);
router.post("/reset-password", resetPassword);
router.post("/change-password", isAuth, changePassword);

router.post("/download-progress", isAuth, downloadProgressLink);

router.get("/getWeeklyProgress", isAuth, getWeeklyProgress);
router.get("/getMonthlyProgress", isAuth, getMonthlyProgress);

router.post("/create-subject", isAuth, createSubject);
router.get("/subject", isAuth, getSubjects);
router.post("/delete-subject", isAuth, deleteSubjects);
router.post("/delete-activity", isAuth, deleteActivity);

router.post("/create-activity", isAuth, createActivity);
router.get("/activity", isAuth, getActivity);
router.get("/activity-all/:subjectId", isAuth, getAllActivity);

router.post("/create-activitySession", isAuth, addActivitySession);
router.get("/getAllActivitySession/:activityId", isAuth, getAllActivitySession);

router.post("/create-grade", isAuth, createGrade);
router.post("/getAllGrades", isAuth, getAllGrades);
router.post("/deleteGrade", isAuth, deleteGrade);

router.post("/createEvent", isAuth, createEvents);
router.post("/deleteEvent", isAuth, deleteEvents);
router.get("/getEvents", isAuth, getEvents);
router.post("/resources", validateResources, resources);

router.get("/getStreak", isAuth, getStreak);
router.post("/getChallenges", getChallenges);
router.post("/updateChallenges", updateChallenges);
router.get("/getDays", isAuth, getDays);
module.exports = router;
