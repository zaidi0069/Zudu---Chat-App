const jwt = require('jsonwebtoken')

const generatetokenandsetcookie = ((userid, res)=>{
    
    const token = jwt.sign({userid}, process.env.secretkey, {
        expiresIn:'15m'
    })

    res.cookie("jwt", token, {
        maxAge: 900000, // 15 min in milliseconds
        httpOnly: true,  //accessible only through browser
        samesite: "strict"  //prevent csrf attacks
    })

    
})


module.exports = generatetokenandsetcookie