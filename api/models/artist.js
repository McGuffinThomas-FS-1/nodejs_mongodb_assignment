const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    song: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true
    },
    name: { 
        type: String, 
        required: true}
});

module.exports = mongoose.model("Artist", artistSchema);