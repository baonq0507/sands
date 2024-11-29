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
        bot.sendMessage(chatId, `Người chơi ${username} đặt cược thành công: ${amount} - ${updateData(betData.betData)}`);
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

    return data.map((item) => {
        const idToMessage = ["số đầu tiên", "số thứ hai", "số thứ ba", "số thứ tư", "số thứ năm"];
        // crate message for each betInUser
        const messages = item.map((bet, index) => {
            const idMessage = idToMessage[index] || `số thứ ${index + 1}`;
            const valueMessage = valueToMessage[bet.value] || `value ${bet.value}`;
            return `${idMessage}: ${valueMessage}`;
        });

        const finalMessage = messages.join("\n");
        return finalMessage;
    });
};