const jwt = require('jsonwebtoken');
const User  = require('../Models/UserModel');

const protectRoutes = async (req, res, next)=> {
    try{

        const token = req.cookies.jwt;

        if(!token)
        {
            return res.status(400).json({error:'Unauthorised, no token' })
        }

        //if there is a token
        const decoded = jwt.verify(token, process.env.secretkey )

        //invalid token

        if(!decoded)
        {
            return res.status(400).json({error: 'unauthorized- invaild token'})
        }

        //valid token 

        const user = await User.findById(decoded.userid).select('-password')

        if(!user)
        {
            return res.status(404).json({error: 'user not found'})
        }

        req.user= user

        next()
    }
 
    catch(error){
         console.log(error)
         res.status(500).json({error: 'internal server error'})
    }
}


module.exports=  protectRoutes