mongoose = require('mongoose')

const schema = new mongoose.Schema({
    fristname : String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    nohp: String,
    isActive: Boolean,
    statusDelete: Boolean
})

module.exports = mongoose.model("User", schema)