const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const banner = new Schema({
    url: { type: String, required: true },
    position: { type: Number, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, { collection: 'banner', virtuals: true, toJSON: { virtuals: true } })

banner.plugin(mongoosePaginate)
module.exports = mongoose.model('banner', banner)


