const mongoose = require('mongoose')

const schema = mongoose.Schema

const ConversationSchema = new schema({

    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ], 


    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message", 
            default:[]
        }
    ]

}, {timestamps:true})



const Conversation = mongoose.model("Conversation", ConversationSchema)

module.exports = Conversation