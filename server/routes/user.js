const express = require("express");
const router = express.Router();

const { createUser, userSignIn } = require("../controllers/user.js");

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

router.post("/create-user", validateUsersSignUp, userValidation, createUser);
router.post("/sign-in", validateUsersSignIn, userValidation, userSignIn);

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

router.post("/create-event", isAuth, createEvents);
router.post("/delete-event", isAuth, deleteEvents);
router.get("/getEvents", isAuth, getEvents);
router.post("/resources", validateResources, resources);
module.exports = router;
