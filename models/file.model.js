const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    originalName : String,
    storedName: String,
    path: String,
    size: Number,
    mimeType: String,
    uploadDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('File', fileSchema)