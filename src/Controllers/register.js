const NewUser = require("../Models/registerUserModel")
const bcrypt = require("bcrypt")

async function registerUser(req, res) {
    const { name, mobile, email, password } = req.body;

    try {
        if (name && mobile && email && password) {
            const findEmail = await NewUser.findOne({ email })
            const findMobile = await NewUser.findOne({ mobile })
            const findName = await NewUser.findOne({ name })
            if (!findEmail && !findMobile && !findName) {
                const salt = await bcrypt.genSalt(10);
                const pwd = await bcrypt.hash(password, salt);
                const user = new NewUser({ name, mobile, email, password: pwd })
                const newUser = await user.save();
                res.status(200).send(newUser)
                return;
            } else
                res.status(400).json({ msg: "user details exists" })
        }
        else
            res.status(400).json({ msg: "name,mobile,email,password required" })
    } catch (e) {
        res.status(500).send({ msg: "error occured at server" })
    }
}

module.exports = registerUser;