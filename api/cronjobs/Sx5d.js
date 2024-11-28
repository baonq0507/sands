// const sessionBet = new Schema({
const Sx5d = require('../models/games/Sx5d');
const moment = require('moment');

const createSx5d = async (type) => {
    const num1 = Math.floor(Math.random() * 9);
    const num2 = Math.floor(Math.random() * 9);
    const num3 = Math.floor(Math.random() * 9);
    const num4 = Math.floor(Math.random() * 9);
    const num5 = Math.floor(Math.random() * 9);

    const result = num1 + num2 + num3 + num4 + num5;
    // get last bet
    const lastBet = await Sx5d.findOne({type: type}).sort({ createAt: -1 });
    // lấy 3 số cuối của id
    // tách id thành mảng và lấy 3 số cuối
    let bestId = 100;
    if (lastBet) {
        bestId = parseInt(lastBet.id.toString().split('').slice(-3).join(''));
    }
    bestId += 1;
    if (bestId > 999) {
        bestId = 100;
    }

    bestId = moment().format('DDMMYYYY') + bestId;

    const sessionBet = {
        id: bestId,
        betData: [num1, num2, num3, num4, num5],
        result: result,
        big: result > 22 ? true : false,
        small: result < 23 ? true : false,
        odd: result % 2 !== 0 ? true : false,
        even: result % 2 === 0 ? true : false,
        resultMoney: 0,
        timeStart: new Date(),
        resultOdd: result % 2 !== 0 ? true : false,
        resultEven: result % 2 === 0 ? true : false,
        timeEnd: new Date(new Date().getTime() + 300000),
        // timeEnd: new Date(new Date().getTime() + 30000),
        type: type || 'sx5d'
    }

    const sessionBetData = await Sx5d.create(sessionBet);

    return sessionBetData;
}

module.exports = {
    createSx5d
};
