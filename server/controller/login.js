const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mail = require('../helper/sendmail')
const jwt = require('jsonwebtoken')
const User = require('../model/login')
const data = require('../model/user')
const resetToken = require('../model/resetToken')
const randomStr = require('randomstring')
require('dotenv').config()

// const status = JSON.stringify(response.data.status)
// const message = JSON.stringify(response.data.message)
// const validation = JSON.stringify(response.data.errors[0].msg)


exports.user = (req,res)=>{
    // User.find().select('fname lname createdAt').exec()
    data.find().select('name price').sort().limit(2).exec()
    .then(result=>{
        res.json({result:result,length:result.length})
    })
    .catch(err=>{
        res.json({message:err})
    })
}

exports.users =(req,res)=>{ // upload.single() = 1 file
    const product = new data({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message: 'Create successfullyy',
            created: {
                name:result.name,
                price:result.price,
                _id:result._id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.signup =(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // if (req.body.password!= req.body.Conpassword){
    //     return res.json({status:"error",messege:"Password Don't Match !"})
    // }
    User.find({ email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length >=1){
            console.log(req.body.email)
            return res.json({status:"error",message:"Email already exist"})
           
        }else{
                console.log(req.body.email)
                var OTP = Math.floor(1000 + Math.random() * 9000);
                const subject = "signup verification email "
                const text = `Use OTP to Verify your email: ${OTP}`
                mail(req.body.email,subject,text);
                const VerifyToken = new resetToken({
                    otp : OTP,
                    email : req.body.email
                })
                VerifyToken.save()
                .then(result=>{
                return res.json({status:"ok",message: 'User created Please verify your email by OTP'})
            })
        }
    })
}


exports.login = (req,res)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.json({status:"error",message:'Email not found'})
        }else{
            User.find({email: req.body.email,isVerified:true})
            .exec()
            .then(result=>{
                if(result.length<1){
                    return res.json({status:"error",message:'Email not verify'})
                }else{
                    bcrypt.compare(req.body.password, user[0].password,(error,result)=>{
                        if(result){
                            const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,{
                                expiresIn:"30m"
                            })
                            console.log(token)
                            return res.json({status:"ok",message:'Login Successful',token:token})
                        }else{
                            return res.json({status:"error",message:"Invalid Password"})
                        }
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.forget = (req,res)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.json({status:"error",message:'Email not found'})
        }else{
            var OTP = Math.floor(1000 + Math.random() * 9000);
            const subject = "Reset password verification email "
            const text = `Use OTP: ${OTP} to Reset your password 
            OTP Expire in 10 minute`
            mail(req.body.email,subject,text);
            const VerifyToken = new resetToken({
                email : req.body.email,
                otp : OTP
            })
            VerifyToken.save()
            .then(result=>{
                console.log(result)
                return res.json({status:"ok",message: 'Please verify your email for reset password by OTP'
            })
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.resetPass = async (req, res) => {
    // grab the token
    const password = req.body.password
    const otp = req.body.data.otp
    const email = req.body.data.email
    console.log(otp,email)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const response = await User.findOne({email:email})
    if(response){
        bcrypt.hash(password,10, async(err,hash)=>{
            var userData = await User.findOne({ email: email });
            userData.password = hash;
            await userData.save();
            // delete the token now itself
            await resetToken.findOneAndDelete({otp:otp})
            return res.json({status:"ok",message: 'reset password successful'
            })
        })
    }else{
        return res.json({status:"ok",message: 'reset password successful'})
    }
        // const  = req.body.otp;
        // const result = await resetToken.findOne({email:req.body.email})
        //     if(result){
        //         console.log(result)
        //         const result1 = await resetToken.findOne({email:req.body.email,otp:OTP})
        //         if(result1){
        //             bcrypt.hash(req.body.password,10,async(err,hash)=>{
        //                 var userData = await User.findOne({ email: result1.email });
        //                 userData.password = hash;
        //                 await userData.save();
        //                 // delete the token now itself
        //                 await resetToken.findOneAndDelete({ otp: OTP });
        //                 return res.json({status:"ok",message: 'reset password successful'
        //                 })
        //             })
        //         }else{
        //             console.log(result1)
        //             return res.json({status:"error",message:"OTP Not correct"})
        //         }
        //     }else{
        //         console.log(result)
        //         return res.json({status:"error",message: 'OTP expire please try again'
        //              })
        //     }
    }

exports.userUpdate = async (req,res)=>{
    // var createdAt = function(){
    //     var formattedDate = moment().format('YYYY/MM/DD HH:mm:ss');
    //     return formattedDate;
    // };
    const id = req.body.id
    console.log(req.body)
    const response = await User.findByIdAndUpdate(id,{$set: req.body},{new:true})
    if(response){
        return res.json({status:'ok',message:'User updated'})
    }else{
        return res.json({status:'error',message:'Something went wrong! Please Try Again.'})
    }
}

exports.profile = async (req, res)=>{
    const response = await User.findOne({email:req.body.email})
    if(response){
console.log(response)
        return res.json({status:'ok',response:response})
    }else{
        return res.json({status:'error'})
    }
}

exports.authen =(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,process.env.JWT_key)
        return res.json({status:"ok",message: 'Authen'})
    }catch(err){
        return res.json({status:"err",message: 'Auth Failed'})
    }

}
