const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleUniqueUsersErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { songFormatter } = require('../../utils/sanitizers');

const { User, Album, Song } = require('../../db/models')

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

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });

        const token = await setTokenCookie(res, user);

        return res.json({
            id: user.id,
            firstName,
            lastName,
            username,
            email,
            token
        });
    }
);

router.get('/:userId/songs',
    async (req, res, next) => {
        let user = await User.findByPk(req.params.userId, {
            include: [Song]
        });
        if (!user) {
            const err = new Error("User couldn't be found");
            err.status = 404;
            return next(err);
        }
        const Songs = user.Songs.map(songFormatter);
        res.json({ Songs })
    }
)

module.exports = router;
