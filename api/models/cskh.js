const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const cskh = new Schema({
    url: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, { collection: 'cskh', virtuals: true, toJSON: { virtuals: true } })

module.exports = mongoose.model('cskh', cskh)
