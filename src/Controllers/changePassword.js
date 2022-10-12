const jwt = require("jsonwebtoken")
const User = require("../Models/registerUserModel")
const bcrypt = require("bcrypt")
//const verifyToken = require("../Middleware/verifyJwt")

const token = process.env.SECRECTKEY;

async function changePassword(req, res) {

    const { oldPwd, newPwd } = req.body;
    try {

        const header = req.headers.token;
        if (!header) {
            return res.status(401).json({ msg: "user not authenticated" });
        }

        const accessToken = header.split(" ")[1];
        if (!accessToken) {
            return res.status(403).json({ msg: "Illegal token" })
        }

        jwt.verify(accessToken, token, async (err, decoded) => {
            if (err)
                return res.status(404).json({ msg: "Illegal access" })

            if (decoded) {
                const user = await User.findById(decoded._id);
                const isValid = await bcrypt.compare(oldPwd, user.password)
                if (!isValid) {
                    return res.status(400).json({ msg: "Password not same" })
                }

                const salt = await bcrypt.genSalt(10);
                const pwd = await bcrypt.hash(newPwd, salt);

                await User.findByIdAndUpdate({ _id: user._id }, { password: pwd }, { new: true })
                return res.status(200).json({ msg: "Password set successfully" })
            }
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = changePassword;