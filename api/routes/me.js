require('dotenv').config();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const users = require('../models/users');
const balanceFluctuations = require('../models/balanceFluctuation');
const historyBet = require('../models/games/historyBet');
const requestMoney = require('../models/requestMoney');
const transaction = require('../models/transaction');
const md5 = require('md5');
const telegramAPI = require('node-telegram-bot-api');
const { formatNumber } = require('../common');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const tokenTelegram = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new telegramAPI(tokenTelegram, {
    polling: true, request: {
        agentOptions: {
            keepAlive: true,
            family: 4
        }
    }
});
/* GET users listing. */
router.get('/profile', jwtMiddleware.verifyToken, function (req, res, next) {
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);
        if (userFind) {
            // tổng hợp tiền đặt cược hôm nay và tổng tiền thắng hôm nay
            const totalOnbet = await historyBet.aggregate([
                {
                    $match: {
                        createAt: {
                            $gte: new Date(new Date().setHours(0, 0, 0)),
                            $lt: new Date(new Date().setHours(23, 59, 59))
                        },
                        userID: userFind._id
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalOnbet: { $sum: "$amount" },
                        totalWin: { $sum: "$win" }
                    }
                }
            ]);
            res.status(200).send({ user: userFind, totalOnbet: totalOnbet[0] });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});

//balanceFluctuations
router.get('/get-balance-fluctuation', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { page, results } = req.query;
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);
        if (userFind) {
            const OPTIONS = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(results, 10) || 10,
                sort: { createAt: -1 },
                populate: 'user'
            }
            const query = {};
            query.userID = userFind._id;
            if (req.query.type) {
                query.type = req.query.type;
            }
            if (req.query.fromDate && req.query.toDate) {
                query.createAt = { $gte: req.query.fromDate, $lte: req.query.toDate }
            }

            const balanceFluctuationData = await requestMoney.paginate(query, OPTIONS);

            res.status(200).send(balanceFluctuationData);
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});

router.get('/historybet/:userID', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { page, result } = req.query;
    const { userID } = req.params;

    if (!userID) {
        return res.status(400).send({ message: "Người dùng không hợp lệ" });
    }

    const OPTIONS = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(result, 10) || 10,
        sort: { createAt: -1 },
        populate: 'betData'
    }
    const query = {};
    query.userID = userID;
    if (req.query.type) {
        query.type = req.query.type;
    }
    if (req.query.fromDate && req.query.toDate) {
        query.createAt = { $gte: req.query.fromDate, $lte: req.query.toDate }
    }

    const historyBetsData = await historyBet.paginate(query, OPTIONS);

    res.status(200).send(historyBetsData);
});

router.post('/link-bank', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { bankAccountNumber, bankName, bankBranch, bankAccountName } = req.body;
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);
        if (userFind) {
            userFind.bankAccountNumber = bankAccountNumber;
            userFind.bankName = bankName;
            userFind.bankBranch = bankBranch;
            userFind.bankAccountName = bankAccountName;
            await userFind.save();
            res.status(200).send({ message: "Cập nhật thành công" });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});
router.post('/withdraw', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { amount, reson, type, password2 } = req.body;

    if (!amount) {
        return res.status(400).send({ message: "Vui lòng nhập số tiền" });
    }

    if (!password2) {
        return res.status(400).send({ message: "Vui lòng nhập mật khẩu rút tiền" });
    }
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);

        if (userFind) {
            if (userFind.password2 !== md5(password2)) {
                return res.status(422).send({ message: "Mật khẩu rút tiền không đúng" });
            }
            if (amount > userFind.balance) {
                return res.status(422).send({ message: "Số dư không đủ" });
            }
            const newRequestMoney = new requestMoney({
                userID: userFind._id,
                amount: amount,
                reson: reson,
                type: type,
                beforeBalance: userFind.balance,
                afterBalance: userFind.balance - amount,
                statusProcess: 0
            });
            await newRequestMoney.save();

            userFind.balance -= amount;
            await userFind.save();

            try {

                try {
                    await bot.sendMessage(chatId, `Người dùng ${userFind.username} vừa yêu cầu rút tiền ${formatNumber(amount)}`);
                } catch (err) {
                    console.error('Lỗi gửi tin nhắn Telegram:', err.message);
                }
            } catch (error) {
                console.error('Lỗi khởi tạo bot Telegram:', error);
            }

            res.status(200).send({ message: "Yêu cầu rút tiền thành công", user: userFind });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});

router.put('/profile', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { phone, email, fullname, inviteCode, avatar } = req.body;
    console.log(req.body);
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);
        if (userFind) {
            if (phone) userFind.phone = phone;
            if (email) userFind.email = email;
            if (fullname) userFind.fullname = fullname;
            if (inviteCode) userFind.inviteCode = inviteCode;
            if (avatar) userFind.avatar = avatar;
            await userFind.save();
            res.status(200).send({ message: "Cập nhật thành công", user: userFind });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});
//api report user money
router.get('/report-user-money', jwtMiddleware.verifyToken, async (req, res, next) => {
    // tổng hợp tiền đặt cược hôm nay và tổng tiền thắng hôm nay
    const totalOnbet = await historyBet.aggregate([
        {
            $match: {
                createAt: {
                    $gte: new Date(new Date().setHours(0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59))
                }
            }
        },
        {
            $group: {
                _id: null,
                totalOnbet: { $sum: "$amount" },
                totalWin: { $sum: "$win" }
            }
        }
    ]);

    res.status(200).send(totalOnbet);
});

// change password
router.put('/change-password', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);
        if (userFind) {
            if (newPassword !== confirmPassword) {
                return res.status(400).send({ message: "Mật khẩu không khớp" });
            }
            if (userFind.password !== md5(oldPassword)) {
                return res.status(400).send({ message: "Mật khẩu cũ không đúng" });
            }
            userFind.password = md5(newPassword);
            await userFind.save();
            res.status(200).send({ message: "Đổi mật khẩu thành công" });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
})
router.post('/deposit', jwtMiddleware.verifyToken, async (req, res, next) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).send({ message: "Vui lòng nhập số tiền" });
    }
    let token = req.session.token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send({ message: "Đăng nhập hết hạn, Vui lòng đăng nhập lại!" });
    }



    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Tài khoản không hợp lệ",
            });
        }
        const userFind = await users.findById(decoded.id);

        if (userFind) {
            const newRequestMoney = new requestMoney({
                userID: userFind._id,
                amount: amount,
                type: 'deposit',
                beforeBalance: userFind.balance,
                afterBalance: userFind.balance + amount,
                statusProcess: 0
            });
            await newRequestMoney.save();

            try {
                try {
                    await bot.sendMessage(chatId, `Người dùng ${userFind.username} vừa yêu cầu nạp tiền ${formatNumber(amount)}`);
                } catch (err) {
                    console.error('Lỗi gửi tin nhắn Telegram:', err.message);
                }
            } catch (error) {
                console.error('Lỗi gửi tin nhắn Telegram:', error);
            }
            res.status(200).send({ message: "Yêu cầu nạp tiền thành công", user: userFind });
        } else {
            res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
    });
});
module.exports = router;