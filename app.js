const express = require('express');
require('dotenv').config();
const apiRoute = require("./src/Routes/action")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT
app.use(cors())

app.use(express.json());

app.use('/api/v1', apiRoute)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})