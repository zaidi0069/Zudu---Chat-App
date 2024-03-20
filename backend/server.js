const express = require('express')
const dotenv = require('dotenv')


dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.get('/', (req, res)=>{
    res.send('Hello woreld')
})


app.listen(PORT, ()=>{
    console.log(`server listening on port  ${PORT}`)
})