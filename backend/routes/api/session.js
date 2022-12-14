const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Creates validation middlewares for login as an array
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];

// Log in
router.post('/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            err.stack = undefined;
            return next(err);
        }

        const token = await setTokenCookie(res, user);

        const { id, firstName, lastName, email, username } = user;

        return res.json({
            id, firstName, lastName, email, username, token
        });
    }
);

// Restore session user
router.get('/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(user.toSafeObject());
        } else return res.json(null);
    }
);

// Log out
router.delete('/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

module.exports = router;
