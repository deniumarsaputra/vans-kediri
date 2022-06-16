const mongoose = require('mongoose')
const ObjectID = mongoose.SchemaTypes.ObjectId

const schema = new mongoose.Schema({
    kode: String,
    name: String,
    price: Number,
    categori: {type: ObjectID, ref: "Kategori"},
    description: String,
    tags: String,
    photos: {p1: String, p2: String, p3: String},
    realease: {type: Boolean, default: false},
    statusDelete: {type: Boolean, default: false}
})

module.exports = mongoose.model("Produk", schema)
