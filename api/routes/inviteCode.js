const express = require('express');
const router = express.Router();
const inviteCode = require('../models/inviteCode');

const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/', jwtMiddleware.verifyToken, async (req, res) => {
    try {
        const inviteCodeData = await inviteCode.findOne({});
        res.status(200).json(inviteCodeData);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.put('/:id', jwtMiddleware.verifyToken, async (req, res) => {
    const { id } = req.params;
    const {code , status} = req.body;
    try {
        const updatedInviteCode = await inviteCode.findOneAndUpdate(
            { _id: id },
            {
                code: code,
                status: status
            },
        );
        res.status(200).json(updatedInviteCode);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;