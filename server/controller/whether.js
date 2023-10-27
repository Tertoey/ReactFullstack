require('dotenv').config()
const url = require('url')
const axios = require('axios')

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

exports.weather = async (req,res)=>{
    const city = req.body.city
    console.log(url.parse(req.url, true).query)
    const params = new URLSearchParams({
        ...url.parse(req.url, true).query,
        [API_KEY_NAME]: API_KEY_VALUE,
      })
    try{
        const response = await axios.get(`${API_BASE_URL}?${params}`)
        const data = response.data
        console.log(data)
        console.log(req.ip)
        res.json(data)
    }catch(error){
        res.json({error:"sdfsd"})
    }
}

exports.weatherSearch = async (req,res)=>{
    const city = req.body.city
    console.log(city)
    const params = new URLSearchParams({
        q:city,
        [API_KEY_NAME]: API_KEY_VALUE,
      })
    try{
        const response = await axios.post(`${API_BASE_URL}?${params}`)
        console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        const data = response.data
        res.json({status:"ok",result:data})
    }catch(error){
        res.json({status:"error",result:"city not found"})
    }
}

