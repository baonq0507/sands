var express = require('express');
var router = express.Router();
const banner = require('../models/banner');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/', async (req, res, next) => {

    const { page, limit } = req.query;
    const OPTIONS = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { position: 1 },
    }

    const query = {};

    const bannerList = await banner.paginate(query, OPTIONS);

    res.status(200).send(bannerList);
});

router.post('/', jwtMiddleware.verifyToken, async (req, res, next) => {

    const { url, position } = req.body;

    const newBanner = new banner({ url, position });

    const bannerSave = await newBanner.save();

    res.status(200).send(bannerSave);
});

router.put('/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { id } = req.params;
    const { url, position } = req.body;

    const bannerUpdate = await banner.findByIdAndUpdate(id, { url, position }, { new: true });

    res.status(200).send(bannerUpdate);

});

router.delete('/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { id } = req.params;

    const bannerDelete = await banner.findByIdAndDelete(id);

    res.status(200).send(bannerDelete);
});
module.exports = router;