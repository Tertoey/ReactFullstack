const express = require('express');
const app = express();
const userRoute = require('./router/login')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
app.set('trust proxy', 1)

app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
mongoose.connect('mongodb+srv://klo123645:'+ process.env.MONGO_ATLAS_PW +'@cluster0.9djy9xz.mongodb.net/userDB?retryWrites=true&w=majority')
// ,{
//   useNewUrlParser: true, 
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
// mongoose.connect('mongodb+srv://klo123645:'+ process.env.MONGO_ATLAS_PW +'@cluster0.9djy9xz.mongodb.net/Milesight?retryWrites=true&w=majority')

app.use(userRoute)
 
module.exports = app