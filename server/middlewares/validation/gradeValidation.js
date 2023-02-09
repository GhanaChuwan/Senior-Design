const { check } = require('express-validator');

exports.validateGrade = [
    check('gradeName').trim().not().isString().isEmpty().isLength({ min: 1, max: 30 }).
        withMessage(' grade name must be with 1 to 30 Character!'),
    check('gradeType').trim().not().isString().isEmpty().isLength({ min: 1, max: 30 }).
        withMessage(' grade type must be with 1 to 30 Character!'),
    check('gradePoints').trim().not().isString().isEmpty().isLength({ min1, max: 10 }).
        withMessage(' grade points must have value between 1 to 10!'),
]