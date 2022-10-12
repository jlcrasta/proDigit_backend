const NewUser = require("../Models/registerUserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const key = process.env.SECRECTKEY;

async function authUser(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ msg: "email and password required" })
            return;
        }

        const isUser = await NewUser.findOne({ email })
        if (!isUser) {
            res.status(400).json({ msg: "User Not Found" })
            return;
        }

        const isValid = await bcrypt.compare(password, isUser.password)
        if (!isValid) {
            res.status(400).json({ msg: "check username and password" })
            return;
        }

        const token = jwt.sign(
            {
                _id: isUser._id,
                email: isUser.email
            },
            key,
            { expiresIn: '5h' })

        res.status(200).json({ email, isValid: isValid, token: token })

    }
    catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Error occured" })
    }
}

module.exports = authUser;