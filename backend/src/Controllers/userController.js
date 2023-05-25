const userModel = require('../Models/userModel')
const validWare = require('../Middlewares/validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { isValidEmail, isValidObjectId, isValidName, isValidMobile, isValidString } = validWare

const createUser = async function (req, res) {
    try {

        const mandatoryFields = ['fname', 'lname', "email", "password", "phone"]

        for (let i of mandatoryFields) {
            if (!req.body[i]) {
                return res.status(400).send({ status: false, message: `${i} is not present` })
            }
        }

        let { fname, lname, email, phone, password } = req.body

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "body must not be empty" })

        if (!validWare.isValidEmail(fname)) {
            return res.status(400).send({ status: false, message: "Provide a valid first name" })
        }
        if (!validWare.isValidName(lname)) {
            return res.status(400).send({ status: false, message: "Provide a valid last name" })
        }

        if (!validWare.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Provide a valid email" })
        }
        if (!validWare.isValidMobile(phone)) {
            return res.status(400).send({ status: false, message: "Provide a valid indian phone no." })
        }

        let unique = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
        if (unique) {
            if (unique.email == email) return res.status(400).send({ status: false, message: "email is already registered" })
            if (unique.phone == phone) return res.status(400).send({ status: false, message: "already registered with this mobile number" })
        }

        let trimPassword = password.trim()
        if (password != trimPassword) return res.status(400).send({ status: false, message: "Please don't begin or end your password with blank space" })
        if (password.length < 8 || password.length > 15) {
            return res.status(400).send({ status: false, message: "Provide a password within length 8 to 15" })
        }

        let data = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        data.password = hashPassword

        let createdData = await userModel.create(data)
        res.status(201).send({ status: true, message: "Your account created successfully", data: createdData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const loginUser = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide email and password." })

        let { email, password } = data

        if (!email) return res.status(400).send({ status: false, message: "email is required" })

        email = email.toLowerCase()
        if (!validWare.isValidEmail(email)) return res.status(400).send({ status: false, message: "please enter a valid Email" })

        if (!password) return res.status(400).send({ status: false, message: "password is required" })

        let userData = await userModel.findOne({ email: email })
        if (!userData) return res.status(404).send({ status: false, message: "Email not found" })

        let hashPassword = userData.password

        let result = await bcrypt.compare(password, hashPassword)
        if (!result) return res.status(400).send({ status: false, message: "Entered password is incorrect" })

        let token = jwt.sign(

            { userId: userData._id.toString() },
            "the-secret-key",
            { expiresIn: '15h' }
        )

        res.setHeader('authorization', token)
        return res.status(200).send({ status: true, message: "User login successful", data: { userId: userData._id, token: token } });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUser, loginUser }