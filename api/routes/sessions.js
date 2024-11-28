var express = require('express');
var router = express.Router();

const sessions = require('../models/games/Sx5d');

const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/get/:type', jwtMiddleware.verifyToken, async (req, res, next) => {
    const {type} = req.params;
    const { page, results } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(results, 10) || 10,
        sort: { createAt: -1 },
    }

    const query = {
        type: type,
        // time end < now
        timeEnd: { $lt: new Date() }
    }

    const historyBetList = await sessions.paginate(query, options);

    res.status(200).send(historyBetList);
})

module.exports = router;

