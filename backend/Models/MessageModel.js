const mongoose = require('mongoose')

const schema = mongoose.Schema

const MessageSchema= new schema({

    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 

    Message:{
        type: String, 
        required: true
    }
}, {timestamps: true})



const Message = mongoose.model("Message", MessageSchema)


module.exports = Message