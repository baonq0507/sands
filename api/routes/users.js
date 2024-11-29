require('dotenv').config();
var express = require('express');
var router = express.Router();
const users = require('../models/users');

const jwtMiddleware = require('../middleware/jwtMiddleware');
const balanceFluctuations = require('../models/balanceFluctuation');
const requestMoney = require('../models/requestMoney');
const md5 = require('md5');

// const io = require('socket.io')(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });
// how to use socket.io in express
// https://socket.io/docs/v4/server-api/
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(express);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* GET users listing. */
// list
router.get('/list', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { page, limit } = req.query;

  const OPTIONS = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
    sort: { createAt: -1 },
    populate: 'historyBet userInvited'
  }
  const query = {};
  if (req.query.username) {
    query.username = req.query.username;
  }
  if (req.query.email) {
    query.email = req.query.email;
  }
  if (req.query.phone) {
    query.phone = req.query.phone;
  }
  if (req.query.role) {
    query.role = req.query.role;
  }
  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.search) {
    query.$or = [
      { username: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { phone: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  if (req.query.fromDate && req.query.toDate) {
    query.createAt = { $gte: req.query.fromDate, $lte: req.query.toDate }
  }

  const userList = await users.paginate(query, OPTIONS);

  res.status(200).send(userList);

})

// update
router.put('/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { phone, status, email, role, permissions } = req.body;

  // update user
  const user = await users.findById(id);
  if (!user) {
    return res.status(404).send('User not found');
  }

  const userUpdate = await users.findByIdAndUpdate(id, { phone, status, email, role, permissions });

  if (!userUpdate) {
    return res.status(404).send('User not found');
  }
  res.status(200).send(userUpdate);
});

const formatCurrency = (value) => {
  if (!value) return 0;
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

router.get('/get-request-money', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { page, limit } = req.query;

  const OPTIONS = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
    sort: { createAt: -1 },
    populate: 'user'
  }
  const query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }
  if (req.query.fromDate && req.query.toDate) {
    query.createAt = { $gte: req.query.fromDate, $lte: req.query.toDate }
  }

  if (req.query.username) {
    // search user regex
    const user = await users.findOne({ username: { $regex: req.query.username, $options: 'i' } });
    console.log(user);
    if (user) {
      query.userID = user._id;
    } else {
      query.userID = null;
    }
  }
  console.log(query);


  const requestMoneyData = await requestMoney.paginate(query, OPTIONS);

  res.status(200).send(requestMoneyData);
});

router.put('/update-request-money/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const requestMoneyFind = await requestMoney.findById(id);

  if (!requestMoneyFind) {
    return res.status(404).send('Request money not found');
  }

  const user = await users.findById(requestMoneyFind.userID);
  console.log('user', user);

  if (!user) {
    return res.status(404).send('User not found');
  }

  let afterBalance = user.balance;

  if ((status === 'reject' && requestMoneyFind.type === 'withdraw') && requestMoneyFind.statusProcess === 0) {
    afterBalance = user.balance + requestMoneyFind.amount;
    user.balance = afterBalance;
    await user.save();
  } else if (status === 'accept' && requestMoneyFind.type === 'deposit' && requestMoneyFind.statusProcess === 0) {
    afterBalance = user.balance + requestMoneyFind.amount;
    user.balance = afterBalance;
    await user.save();
  }

  const requestMoneyUpdate = await requestMoney.findByIdAndUpdate(id,
    {
      status,
      note,
      updateAt: new Date(),
      beforeBalance: user.balance,
      afterBalance: afterBalance,
      statusProcess: status !== requestMoneyFind.status ? 1 : 0
    }
  );

  if (!requestMoneyUpdate) {
    return res.status(404).send('Request money not found');
  }

  res.status(200).send({...requestMoneyUpdate._doc, userID: user._id, note: note});
})

router.put('/change-password/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Mật khẩu không khớp');
  }

  const newPassword = md5(password);

  const userUpdate = await users.findByIdAndUpdate(id, { password: newPassword });

  if (!userUpdate) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }
  res.status(200).send(userUpdate);
});

// change - password - withdraw
router.put('/change-password-withdraw/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { password2, confirmPassword2 } = req.body;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }

  if (password2 !== confirmPassword2) {
    return res.status(400).send('Mật khẩu không khớp');
  }

  const newPassword = md5(password2);

  const userUpdate = await users.findByIdAndUpdate(id, { password2: newPassword });

  if (!userUpdate) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }
  res.status(200).send(userUpdate);
});

//change-bank
router.put('/change-bank/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { bankName, bankAccountNumber, bankBranch, bankAccountName } = req.body;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }

  const userUpdate = await users.findByIdAndUpdate(id, { bankName, bankAccountNumber, bankBranch, bankAccountName });

  if (!userUpdate) {
    return res.status(404).send({ message: 'Không tìm thấy người dùng' });
  }
  res.status(200).send(userUpdate);
});

//delete
router.delete('/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  await users.deleteOne({ _id: id });

  res.status(200).send('User deleted');

});

//detail user
router.get('/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).send(user);
});

router.put('/update-balance/:id', jwtMiddleware.verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { balance, note, type } = req.body;

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (!balance || isNaN(balance)) {
    return res.status(422).send('Balance is not a number');
  }

  let typeRequest = type === 'add' ? 'deposit' : 'withdraw';
  const afterBalance = type === 'add' ? user.balance + parseFloat(balance) : user.balance - parseFloat(balance);

  if (balance !== 0) {

    const formatDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const requestMoneyData = {
      userID: id,
      amount: balance,
      type: typeRequest,
      status: 'accept',
      description: 'Cập nhật số dư',
      note: note ?? `Bạn được cập nhật số dư ${formatCurrency(user.balance)} thành ${formatCurrency(parseFloat(balance))} vào lúc ${formatDate}`,
      beforeBalance: user.balance,
      afterBalance: afterBalance,
      statusProcess: 1
    }
    await requestMoney.create(requestMoneyData);
  }

  user.balance = afterBalance

  await user.save();

  res.status(200).send(user);

});

//create user
router.post('/create', jwtMiddleware.verifyTokenAdmin, async (req, res, next) => {
  const { username, password, email, phone, role, permissions } = req.body;

  try {
    const user = await users.create({
      username,
      password: md5(password),
      password2: md5(password),
      phone,
      email,
      role,
      permissions
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(422).json({ message: 'Tài khoản đã tồn tại!' })
    }
  }
})


module.exports = router;
