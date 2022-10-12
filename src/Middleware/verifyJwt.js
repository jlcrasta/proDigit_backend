// const jwt = require("jsonwebtoken")
// const User = require("../Models/registerUserModel")

// const verifyToken = async (req, res) => {
//     try {

//         const header = req.headers.token;
//         if (!header) {
//             return res.status(401).json({ msg: "user not authenticated" });
//         }

//         const accessToken = header.split(" ")[1];
//         if (!accessToken) {
//             return res.status(403).json({ msg: "Illegal token" })
//         }

//         jwt.verify(accessToken, 'egfWJKAJKF', async (err, decoded) => {
//             if (err)
//                 return res.status(404).json({ msg: "Illegal access" })

//             if (decoded) {
//                 return await User.findById(decoded._id);
//                 //return res.status(200).json({ user })
//             }
//         });

//     } catch (e) {
//         console.log(e)
//         return res.status(500).json({ msg: "Server error" })
//     }
// }

// module.export = verifyToken;