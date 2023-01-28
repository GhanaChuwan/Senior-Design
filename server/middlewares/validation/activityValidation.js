const{check} = require('express-validator');

exports.validateActivity =[
    check('activity').trim().not().isString().isEmpty().isLength({min:3, max:20}).
    withMessage(' activity must be with 3 to 20 Character!'),
    check('description').trim().not().isString().isEmpty().isLength({min:3, max:50}).
    withMessage(' description must be with 3 to 50 Character!'),
    check('color').trim().not().isString().isEmpty().withMessage(' Please selected the color for subject!'),
]