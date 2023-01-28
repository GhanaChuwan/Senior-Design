const express = require('express');
const router = express.Router();


const {createUser, userSignIn} = require('../controllers/user.js')

const {isAuth} = require("../middlewares/validation/auth");
const {validateUsersSignUp, userValidation, validateUsersSignIn} = require("../middlewares/validation/user");
const {validateSubject} = require("../middlewares/validation/subjectValidation");
const {createSubject, getSubjects} = require("../controllers/subject");
const {validateActivity} = require("../middlewares/validation/activityValidation");
const {createActivity} = require("../controllers/activity");
const {validateResources} = require("../middlewares/validation/resourcesValidation");
const {resources} = require("../controllers/resources");


router.post('/create-user', validateUsersSignUp, userValidation, createUser);
router.post('/sign-in',  validateUsersSignIn, userValidation, userSignIn);

router.post('/create-subject', isAuth, createSubject)
router.get('/subject', isAuth, getSubjects)
router.post('/create-activity', validateActivity, createActivity);
router.post('/resources',validateResources, resources)
module.exports = router;
