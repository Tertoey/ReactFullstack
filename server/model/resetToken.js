const mongoose = require('mongoose')
const moment = require('moment');

// var createdAt = function(){
//     var formattedDate = moment().format('YYYY/MM/DD HH:mm:ss');
//     return formattedDate;
// };
  
const resetTokens = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
}
)

module.exports = mongoose.model('resetTokens', resetTokens);