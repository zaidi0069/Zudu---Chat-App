const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User= require('../Models/UserModel')
const generatetokenandsetcookie = require('../utils/generatetoken')
const Router = express.Router()

const login = async (req, res) => {

    try {

        const { UserName, Password } = req.body

        const existinguser = await User.findOne({ UserName })
   
        if (!existinguser) {
           return  res.status(400).json({ error: "invalid username or password" })
        }

        else {
            const passverification = await bcrypt.compare(Password, existinguser.Password)
            if (!passverification) {
                return res.status(400).json({ error: "invalid username or password" })
            }

            else {

                generatetokenandsetcookie(existinguser._id, res)

                res.status(200).json("logged in successfully")
            }


        }

    }

    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }

}



const logout = async (req, res) => {
    res.cookie("jwt", "", {
        expiresIn: 0
    })

    res.send("logged out")
}





const signup = async (req, res) => {

    try {

        const { UserName, Email, Password, ConfirmPassword, FirstName, LastName } = req.body;

        //password check 

        if(Password.length<8)
        {
            return res.status(400).json({error: "Password length must be atleast 8 characters"})
        }
        if (Password !== ConfirmPassword) {
            return res.status(400).json({ error: "passwords do not match" })
        }

        //email check
        const emailcheck = await User.findOne({ Email })

        if (emailcheck) {
            return res.status(400).json({ error: "email already exists" })
        }

        //username check

        const checkusername = await User.findOne({ UserName })

        if (checkusername) {
            return res.status(400).json({ error: "username already exits" })
        }



        bcrypt.hash(Password, 8).then((hashedpassword) => {

            const user = new User({
                Email, Password: hashedpassword, UserName, FirstName, LastName
            })

            generatetokenandsetcookie(user._id, res)

            user.save().then(() => {
                console.log('user saved to db')
            })


            res.status(200).json({ message: 'user saved', user })
        })

    }
    catch (err) {
        console.log(err)
    }


}


module.exports = { login, signup, logout }