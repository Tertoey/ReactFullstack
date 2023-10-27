const express = require('express')
const router = express.Router()
const {signUpValidation,resetPassValidation} = require('../helper/validator')
const userController = require('../controller/login')
const userVerify = require('../controller/verify')
const warehouse = require('../controller/sensors')
const weather = require("../controller/whether")
const apicache = require('apicache')
const rateLimit = require('express-rate-limit')

// Proxy
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 Mins
//     max: 2,
//     message: ({ 
//         error: 'Please try again in: ' ,
//         statusCode: 429
//     }),
//   })

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 3,
    message: (req, res) => {
        const remaining = res.getHeader('Retry-After')
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        return res.json({
            error :`Please try again in ${minutes}min ${seconds}sec `,
            statusCode: 429
        })
    }
  });

// Init cache
let cache = apicache.middleware

// User Section
router.post('/signup',signUpValidation,userController.signup)
router.post('/login',userController.login)
router.get('/user',limiter,userController.user)
router.post('/users',userController.users)
router.patch('/editprofile',limiter,userController.userUpdate)
router.post('/authen',userController.authen)
router.post('/resetpass',resetPassValidation,userController.resetPass)
router.post('/verifyuser', userVerify.verifyemail)
router.post('/verifyresetpass',userVerify.verifyResetPass)
router.post('/forget',userController.forget)
router.post('/profile',userController.profile)

//query Section
router.get('/warehouseFlow',warehouse.flow)
router.get('/warehouseAll',warehouse.allData)
router.get('/am319',warehouse.am319)

// weather 
router.get('/weather',cache('2 minutes'),weather.weather)
router.post('/searchCity',weather.weatherSearch)


module.exports=router