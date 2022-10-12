const jwt = require("jsonwebtoken")
const User = require("../Models/registerUserModel")
//const verifyToken = require("../Middleware/verifyJwt")

const token = process.env.SECRECTKEY;

async function fetUserDetails(req, res) {

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
                return res.status(200).json({ user })
            }
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = fetUserDetails;