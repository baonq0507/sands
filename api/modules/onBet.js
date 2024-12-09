require('dotenv').config();
const historyBet = require('../models/games/historyBet');
const users = require('../models/users');
const Sx5d = require('../models/games/Sx5d');
const settings = require('../models/settings');
const telegramAPI = require('node-telegram-bot-api');
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

module.exports = async (socket, data) => {
    // // Logic xử lý sự kiện onBet
    socket.on('onBet', (data) => {
        console.log('onBet event received with data:', data);
        onBet(socket, data);
    });
};

const onBet = async (socket, data) => {
    const { betDataID, amount, betInUser, userID, code, username } = data;
    const historyBetData = {
        betDataID,
        userID,
        amount,
        betInUser,
        code
    }
    try {
        await historyBet.create(historyBetData);

        const user = await users.findOne({ _id: userID });
        if (user.balance < amount) {
            socket.emit(`notMoney-${userID}`, { status: 'fail' });
            return;
        }
        user.balance -= amount;

        await user.save();

        const betData = await Sx5d.findOne({ _id: betDataID });
        betData.resultMoney += amount;
        await betData.save();

        // get HistoryBetList
        const historyBetList = await historyBet.findOne({ betDataID: betDataID }).sort({ createAt: -1 }).populate('user');

        socket.broadcast.emit(`betDataUser-${code}`, { historyBetList });
        // get balance user
        const userBalance = await users.findOne({ _id: userID });
        socket.emit(`betDataResponse-${userID}`, { status: 'success', balance: userBalance.balance });

        bot.sendMessage(chatId, `
🎮 <b>THÔNG BÁO ĐẶT CƯỢC</b>

👤 Người chơi: ${username}
🆔 ID: ${userID}
🎲 Phiên: ${betData.id}
💰 Số tiền: ${amount}

📝 Chi tiết đặt cược:
${updateData(betInUser)}`, { parse_mode: 'HTML' });
    }
    catch (error) {
        console.log(error);
        socket.emit('betDataResponse', { status: 'fail' });
    }
}

const updateData = (data) => {
    const valueToMessage = {
        1: "Lớn",
        2: "Nhỏ",
        3: "Lẻ",
        4: "Chẵn"
    };

    const messages = [];
    const idToMessage = ["số đầu tiên", "số thứ hai", "số thứ ba", "số thứ tư", "số thứ năm", "Tổng"];
    // crate message for each betInUser
    //  { id: 0, value: 1 }, { id: 0, value: 2 }
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const bet = data[i];
        switch (bet.id) {
            case 0:
                messages.push(`${idToMessage[0]}: ${valueToMessage[bet.value]}`);
                break;
            case 1:
                messages.push(`${idToMessage[1]}: ${valueToMessage[bet.value]}`);
                break;
            case 2:
                messages.push(`${idToMessage[2]}: ${valueToMessage[bet.value]}`);
                break;
            case 3:
                messages.push(`${idToMessage[3]}: ${valueToMessage[bet.value]}`);
                break;
            case 4:
                messages.push(`${idToMessage[4]}: ${valueToMessage[bet.value]}`);
                break;
            case 5:
                messages.push(`Tổng: ${valueToMessage[bet.value]}`);
                break;
        }
    }
    return messages.join("\n");
};