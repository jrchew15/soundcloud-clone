const router = require('express').Router();
const { requireAuth } = require('../../utils/auth.js');
const { couldntFind } = require('../../utils/db-checks.js');
const { Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, forbiddenError } = require('../../utils/validation.js')

const commentAuths = [requireAuth,
    async (req, res, next) => {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) { couldntFind('Comment') }
        if (comment.userId !== req.user.id) throw forbiddenError

        req.comment = comment;
        next();
    }
]

router.put('/:commentId', commentAuths,
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Comment body text is required'),
    handleValidationErrors,
    async (req, res, next) => {
        req.comment.body = req.body.body;
        await req.comment.save();
        res.json(req.comment);
    }
);

router.delete('/:commentId', commentAuths,
    async (req, res, next) => {
        await req.comment.destroy();
        res.json({ message: 'Successfully deleted', statusCode: 200 })
    }
)

module.exports = router;
