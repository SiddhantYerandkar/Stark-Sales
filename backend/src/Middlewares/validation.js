const mongoose = require("mongoose");

exports.isValidEmail = (email) => {

    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(email)
}

exports.isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

exports.isValidName = (name) => {

    return /^[A-Za-z\s]{1,50}$/.test(name)
}

exports.isValidMobile = (mobile) => {

    return /^[6-9]\d{9}$/.test(mobile);
}

exports.isValidString = (value) => {
    if (typeof value == 'undefined' || value == null || value == '') return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
}

exports.isValidPrice = (price) => {

    return /^[1-9]\d{0,7}(?:\.\d{1,2})?$/.test(price)
}