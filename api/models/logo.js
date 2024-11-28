const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logo = new Schema({
    url: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, { collection: 'logo', virtuals: true, toJSON: { virtuals: true } })

module.exports = mongoose.model('logo', logo)
