const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const inviteCode = new Schema({
    code: { type: String, required: true, unique: true },
    status: { type: String, default: 'active' },
}, { collection: 'inviteCode', virtuals: true, toJSON: { virtuals: true } })

module.exports = mongoose.model('inviteCode', inviteCode)