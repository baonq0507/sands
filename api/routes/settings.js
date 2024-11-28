var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const settings = require('../models/settings');
const users = require('../models/users');

const jwtMiddleware = require('../middleware/jwtMiddleware');

/* GET users listing. */
router.get('/', jwtMiddleware.verifyTokenAdmin, async function (req, res, next) {

    const { page, limit } = req.query;

    const OPTIONS = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { createAt: -1 },
        populate: 'user'
    }
    const query = {};
    if (req.query.username) {
        const user = await users.findOne({ username: { $regex: req.query.username, $options: 'i' } });
        if (user) {
            query.userID = user._id;
        } else {
            query.userID = null;
        }
    }

    if (req.query.userID) {
        query.userID = req.query.userID;
    }

    if (req.query.value) {
        query.value = req.query.value;
    }

    const settingData = await settings.paginate(query, OPTIONS);

    res.status(200).send(settingData);
});

router.get('/user/:userId', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { userId } = req.params;

    const setting = await settings.findOne({ userId });

    if (!setting) {
        return res.status(404).send('Setting not found');
    }

    res.status(200).send(setting);
});

router.put('/:id', jwtMiddleware.verifyTokenAdmin, async (req, res, next) => {
    const { value, userId } = req.body;
    const { id } = req.params;

    const setting = await settings.findById(id);

    if (!setting) {
        return res.status(404).send('Setting not found');
    }

    setting.value = value;
    setting.userId = userId;
    setting.updateAt = Date.now();

    await setting.save();

    res.status(200).send(setting);
});

// thêm setting
router.post('/', jwtMiddleware.verifyTokenAdmin, async (req, res, next) => {
    const { value, userId } = req.body;

    if (!value || value !== '1.98'|| value !== '2.1') {
        return res.status(400).send('Value is required');
    }

    if (!userId) {
        return res.status(400).send('User is required');
    }

    const setting = new settings({
        name: 'game',
        value,
        userId
    });

    await setting.save();

    res.status(200).send(setting);
});

router.delete('/:id', jwtMiddleware.verifyTokenAdmin, async (req, res, next) => {
    const { id } = req.params;

    const setting = await settings.findById(id);

    if (!setting) {
        return res.status(404).send('Setting not found');
    }

    await setting.remove();

    res.status(200).send('Setting removed');

});

router.post('/update-all', jwtMiddleware.verifyTokenAdmin, async (req, res, next) => {
    const { value } = req.body;
    console.log(value);

    if (!value) {
        return res.status(400).json({ message: 'Value is required' });
    }

    await settings.updateMany({}, { value });

    res.status(200).json({ message: 'Updated all settings' });
})

module.exports = router;