const express = require("express");
const router = express.Router();
const registerUser = require("../Controllers/register")
const userAuth = require("../Controllers/user")
const fetUserDetails = require("../Controllers/getUser")
const editDetails = require("../Controllers/editDetails")
const changePassword = require("../Controllers/changePassword")
//const wrapAsync = require("../Middleware/appError")
const db = require("../Config/db")


db();

router.post("/prodigit/register", registerUser)
router.post("/prodigit/signIn", userAuth)

router.get("/prodigit/user", fetUserDetails)
router.put("/prodigit/editDetails", editDetails)
router.put("/prodigit/resetPwd", changePassword)

module.exports = router;