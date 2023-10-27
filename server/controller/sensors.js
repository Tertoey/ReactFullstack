const warehouse = require('../model/mysql/dbConnect')
const select = require('../model/mysql/dbSelect')
const milesight = require('../model/Milesight')
const mongoose = require('mongoose')

const mysql = require('mysql2')
require('dotenv').config()

exports.allData = (req,res)=>{
    warehouse.query(select.SELECT_all, (err,result)=>{
        if(err){
            res.json({status:"err",message:'Data not sound'})
        }else{
            data = result.reverse()
            res.json({result:data})
        }
    })
}

exports.flow = (req,res)=>{
    warehouse.query(select.SELECT_flow, (err,result)=>{
        if(err){
            res.json({status:"err",message:'Data not sound'})
        }else{
            res.json({result:result[0]})
        }
    })
}

exports.am319 = (req,res)=>{
    milesight.find().sort({'payload.Timestamp':-1}).limit(1)
    .exec()
    .then(result=>{
        return res.json({result:result[0]})
    })
    .catch(err=>{
        console.error(`Error ${err}`)
    })
}
