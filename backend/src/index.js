const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/route')
const multer = require('multer')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()

const app = express()
const uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

app.use(multer().any())
app.use(express.json())
app.use(cors())


mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.use('/', route)

app.use((req, res) => {
    res.status(404).send({ status: false, message: `Page Not Found , Given URL ${req.url} is incorrect for this application.` })
})

app.listen(PORT, () => console.log(`connected to ${PORT}`))