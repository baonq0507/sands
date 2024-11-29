const user = require('../models/users');
const inviteCode = require('../models/inviteCode');
const users = require('../models/users');
const getUserInviteByCode = async (code) => {
    return await inviteCode.findOne({ code }) || await users.findOne({ inviteCode: code });
}

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
    getUserInviteByCode,
    formatNumber
}