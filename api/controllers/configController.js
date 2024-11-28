
const users = require('../models/users');
const inviteCode = require('../models/inviteCode');
const getInviteCodeOfAdmin = async (req, res) => {
    try {
        const inviteCodeData = await inviteCode.findOne({});
        if (!inviteCodeData || inviteCodeData.status === 'inactive') {
            return res.status(404).json({ message: 'Không tìm thấy mã mời' });
        }
        return res.status(200).json({ inviteCode: inviteCodeData.code });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getInviteCodeOfAdmin
};