const Conversation = require("../Models/ConversationModel")
const Message = require('../Models/MessageModel')

const sendmessage = async (req, res) => {

    const { message } = req.body
    const { id: recieverId } = req.params
    const senderId = req.user._id


    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    const newMessage = await Message.create({
        senderId, recieverId, Message: message
    })

    if (newMessage) {
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }

    //To save multiple in parallel : Promise.all[conversation.save(), newMessage.save()]

    res.status(200).json({ newMessage })
}




const getMessages = async (req, res) =>{

    const {id : recieverId} = req.params
    const senderId = req.user._id


    const conversation= await Conversation.findOne({
        participants:{$all:[senderId, recieverId]}
    }).populate('messages').select('messages')

    if(!conversation)
        {
            return res.status(404).json({})
        }
    
    

    return res.status(200).json({conversation})

}


module.exports = { sendmessage, getMessages }