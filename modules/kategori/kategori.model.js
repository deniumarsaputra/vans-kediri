const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    statusDelete: {type: Boolean, default: false}
})

module.exports = mongoose.model("Kategori", schema)