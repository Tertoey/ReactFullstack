const mongoose = require('mongoose')
const moment = require('moment');
  
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{type:String, 
        require:true,
        unique: true,
        index:true
        // ,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ // use validator instead
    },
    password:{type:String, require:true},
    fname:{type:String, require:true},
    lname:{type:String, require:true},
    // createdAt:{type:String, default:createdAt},
    // updatedAt:{type:String,default:createdAt},
    // lastLoginAt:{type:String},
    isVerified:{type:Boolean,default:true},
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
)
module.exports = mongoose.model('user',userSchema)