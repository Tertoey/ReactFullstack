const User = require('../model/login')
const resetToken = require('../model/resetToken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// exports.verifyemail = async (req, res) => {
//     // grab the token
//     const otp = req.body.otp
//     const email = req.body.email;
//     console.log(otp,email)
//     // check if token exists 
//     // or just send an error
//     if (otp) {
//         var check = await resetToken.findOne({ email:email, otp:otp });
//         if (check) {
//             var userData = await User.findOne({ email: check.email });
//             userData.isVerified = true;
//             await userData.save();
//             // delete the token now itself
//             await resetToken.findOneAndDelete({ otp: otp });
//             return res.json({status:"ok",message: 'User created'
//                         })
//             // res.redirect('/profile');
//         } else {
//             return res.json({status:"error",message:"otp not correct"})
//             // res.render('profile', { username: req.user.username, verified: req.user.isVerified, err: "Invalid token or Token has expired, Try again." });
//         }
//     }
// };

exports.verifyemail =async(req, res) => {
    // grab the token
    const otp = req.body.otp
    const user = JSON.parse(req.body.user)
    const result1 = await resetToken.findOne({email:user.email})
    if(result1){
        console.log(user.email,otp)
        const result = await resetToken.findOne({otp:otp})
        if(result){
            console.log(otp)
            console.log(result)
            bcrypt.hash(user.password,10,async(err,hash)=>{
                if (err) {
                    return res.status(500).json({error : err})
                }else{
                    console.log(hash)
                    const userData = new User({
                        _id:new mongoose.Types.ObjectId(),
                        email : user.email,
                        password: hash,
                        fname: user.fname,
                        lname: user.lname
                    })
                    await userData.save()
                    await resetToken.findOneAndDelete({ otp: otp })
                    .then(resu=>{
                        console.log(resu)
                        return res.json({status:"ok",message: 'User Verify successfull'})
                    })
                }
            })
        }else{
            return res.json({status:"error",message: 'otp not correct'})
        }
    }else{
        console.log(result1)
        return res.json({status:"error",message: 'OTP expire please try again'
             })
    }

};

exports.verifyResetPass = async (req, res) => {
    // grab the token
    const email = req.body.email
    const otp = req.body.otp
    console.log(email,otp)
    // check if token exists 
    // or just send an error
    const response = await resetToken.findOne({email:email,otp:otp})
    if(response){
        return res.json({status:"ok",message:"OTP Correct"})
    }else{
        return res.json({status:'error',message:'OTP not correct please try agian'})
    }
};