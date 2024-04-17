const express = require('express')
const ProtectRoutes= require('../Middlewares/ProtectRoutes')
const Router = express.Router()

const {login, signup, logout} = require('../Controllers/authcontroller')
const {sendmessage, getMessages} = require('../Controllers/messagecontroller')

Router.post('/login', login)
Router.post('/signup', signup)
Router.post('/logout', logout)


Router.post('/send/:id', ProtectRoutes, sendmessage)
Router.get('/getMessages/:id', ProtectRoutes, getMessages)



module.exports = Router