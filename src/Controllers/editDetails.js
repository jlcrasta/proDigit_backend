const jwt = require("jsonwebtoken")
const User = require("../Models/registerUserModel")

const token = process.env.SECRECTKEY;

async function editDetails(req, res) {
    const { name, mobile, email } = req.body;
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
                const id = user._id

                const updateUser = await User.findByIdAndUpdate({ _id: id }, { name, mobile, email }, { new: true })
                return res.status(200).json(updateUser)
            }
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = editDetails;