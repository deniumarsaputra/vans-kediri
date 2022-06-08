const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isActive: {type: Boolean, default: true},
    statusDelete: {type: Boolean, default: false}
})

module.exports = mongoose.model("sysUser", schema)