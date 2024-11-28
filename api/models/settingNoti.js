const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const settingNoti = new Schema({
    widthDrawSound: { type: Number, default: 1 },
    depositSound: { type: Number, default: 1 },
    // addBankSound: { type: Number, default: 1 },
}, { collection: 'settingNoti', virtuals: true, toJSON: { virtuals: true } })

settingNoti.plugin(mongoosePaginate);
module.exports = mongoose.model('settingNoti', settingNoti);