const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const transaction = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, { collection: 'transaction', virtuals: true, toJSON: { virtuals: true } })

module.exports = mongoose.model('transaction', transaction)