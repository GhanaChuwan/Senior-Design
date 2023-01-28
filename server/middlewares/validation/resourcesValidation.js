const {check} = require('express-validator');

exports.validateResources =[
    check('titleName').trim().not().isString().isEmpty().isLength({min:3, max:20}).
    withMessage(' Title name must be with 3 to 20 Character!'),
    check('website').trim().isString().withMessage('website required!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('phoneNumber').trim().isString().withMessage('phone number required!'),
    check('officeHours').trim().isString().withMessage('office hours required!'),
    check('location').trim().isString().withMessage('location required!')

]