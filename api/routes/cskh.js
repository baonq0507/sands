var express = require('express');
var router = express.Router();
const cskh = require('../models/cskh');

const users = require('../models/users');

const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/', async (req, res, next) => {

    const urlCskh = await cskh.findOne();

    if(!urlCskh){
        return res.status(404).send({ message: 'Không tìm thấy thông tin cskh' });
    }

    res.status(200).send(urlCskh);
});

router.put('/', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { url } = req.body;

    const cskhData = await cskh.findOne();

    if (!cskhData) {
        return res.status(404).send({ message: 'Không tìm thấy thông tin cskh' });
    }

    const cskhUpdate = await cskh.findByIdAndUpdate(cskhData._id, { url });

    if (!cskhUpdate) {
        return res.status(404).send({ message: 'Không tìm thấy thông tin cskh' });
    }

    res.status(200).send(cskhUpdate);
})
module.exports = router;