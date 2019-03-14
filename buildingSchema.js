const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema(
    {
        building: String,
        floors: Number,
        flats: Array
    }
)

module.exports = mongoose.model('Building', buildingSchema)