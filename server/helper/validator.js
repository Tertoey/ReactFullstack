const {check} = require('express-validator')

exports.signUpValidation = [
    check('fname','Firstname is required').not().isEmpty(),
    check('lname','Lastname is required').not().isEmpty(),
    check("email", "Please enter a valid email").not().isEmpty().isEmail(),
    check("password","Password must be 6 characters long and contain at least one number").isLength({min:6})
]

exports.resetPassValidation = [
    check("password","Password must be 6 characters long and contain at least one number").isLength({min:6})
]