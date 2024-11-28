var express = require('express');
var router = express.Router();
const logo = require('../models/logo');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/', async (req, res, next) => {

    const logoFile = await logo.findOne();

    res.status(200).send(logoFile);
});

// router.post('/', jwtMiddleware.verifyToken, async (req, res, next) => {

//     const { url, position } = req.body;

//     const newBanner = new banner({ url, position });

//     const bannerSave = await newBanner.save();

//     res.status(200).send(bannerSave);
// });

router.put('/', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { url } = req.body;

    const logoUpdate = await logo.findOneAndUpdate({}, { url }, { new: true });

    res.status(200).send(logoUpdate);

});

module.exports = router;