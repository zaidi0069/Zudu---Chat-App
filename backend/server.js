const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Routes = require('./Routes/Routes')


dotenv.config()


const PORT = process.env.PORT || 5000
const DBURL = process.env.MONGODB
const app = express()


app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res)=>{
    res.send('Hello world')
})

 mongoose.connect(DBURL).then(()=>{
    console.log('connected to mongodb')
}).catch((err)=>{
    console.log("error connecting mongodb")
})


app.use('/auth', Routes)
app.use('/messages', Routes)


app.listen(PORT, ()=>{
    
    console.log(`server listening on port  ${PORT}`)
})