const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const db=require('./db')
const mysql = require('mysql2/promise')


mysql.createConnection(db).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})



const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dotenv.config()

const user=require('./router/user')

app.use('/api/v1',user)

app.listen(3090, () => {
  console.log('server running on 3090 port')
})