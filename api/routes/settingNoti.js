var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const settingNoti = require('../models/settingNoti');

router.get('/', async (req, res) => {
    const settingNotiData = await settingNoti.findOne();
    res.json(settingNotiData);
})

router.put('/', async (req, res) => {
    const settingNotiData = await settingNoti.findOne();
    const { widthDrawSound, depositSound } = req.body;
    if(!settingNotiData) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    if (widthDrawSound !== undefined) settingNotiData.widthDrawSound = widthDrawSound
    if (depositSound !== undefined) settingNotiData.depositSound = depositSound
    await settingNotiData.save();
    res.status(200).json(settingNotiData);
})

module.exports = router;