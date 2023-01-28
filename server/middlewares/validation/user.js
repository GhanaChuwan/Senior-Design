const{check, validationResult} = require('express-validator');

exports.validateUsersSignUp = [
    check('firstName').trim().not().isString().isEmpty().withMessage('Must be a valid first name!').isLength({min:3, max:20}).
    withMessage('First name must be with 3 to 20 Character!'),
    check('lastName').trim().not().isString().isEmpty().withMessage('Must be a valid last name! ').isLength({min:3, max:20}).
    withMessage('Last name must be with 3 to 20 Character!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password').trim().not().isEmpty().withMessage('Password is empty').isLength({min:8, max:20}).
    withMessage(' Create password must be with 8  to 20 Character long!'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Both password must be same!')
        }
        return true;
    })

 ];

exports.userValidation =(req, res, next) => {
   return next();

};

exports.validateUsersSignIn = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('email/password is required'),
    check('password')
        .trim()
        .not()
        .isEmail()
        .withMessage('email/password is required'),
];