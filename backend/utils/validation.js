const { check, query, validationResult } = require('express-validator');
const { User } = require('../db/models')
const forbiddenError = new Error('Forbidden!');
forbiddenError.status = 403;

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach((error) => errors[`${error.param}`] = `${error.msg}`);

        const err = Error('Validation Error');
        err.errors = errors;
        err.status = 400;
        next(err);
    }
    next();
};

const handleUniqueUsersErrors = (req, _res, next) => {
    console.log('validating')
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach((error) => errors[`${error.param}`] = `${error.msg}`);

        const err = new Error('User already exists');
        err.errors = errors;
        err.status = 403;
        next(err);
    }
    next();
}


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
    check('email')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('User with that email already exists')
            }
        }),
    check('username')
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                throw new Error('User with that username already exists')
            }
        }),
    handleUniqueUsersErrors
];

const paginationValidators = [
    query('page')
        .if(query('page').exists({}))
        .custom((value) => {
            if (!(parseInt(value) >= 0)) {
                throw new Error("Page must be greater than or equal to 0");
            }
            return true
        }),
    query('size')
        .if(query('size').exists())
        .custom((value) => {
            if (!(parseInt(value) >= 0)) {
                throw new Error("Size must be greater than or equal to 0");
            }
            return true
        }),
];

// custom validator for date format in a query parameter
const dateValidator = query('createdAt')
    .if(query('createdAt').exists())
    .custom((value) => {
        let err = new Error('CreatedAt is invalid');
        let parsed = value.split('-');
        if (parsed.length !== 3) throw err

        let year = parseInt(parsed[0]);
        if (!(year > 0)) throw err

        if (parsed[1].length !== 2 || !(parseInt(parsed[1]) > 0)) throw err

        // if (parsed[2].length !== 16) throw err
        return true
    });


module.exports = {
    handleValidationErrors,
    handleUniqueUsersErrors,
    paginationValidators,
    dateValidator,
    validateSignup,
    forbiddenError
};
