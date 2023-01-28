const {check} = require('express-validator');

exports.validateSubject =[
    check('subject').trim().not().isString().isEmpty().isLength({min:3, max:20}).
    withMessage(' subject must be with 3 to 20 Character!'),
    check('color').trim().not().isString().isEmpty().withMessage(' Please selected the color for subject!'),
]