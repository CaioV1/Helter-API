const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({

    _id : {type: Schema.Types.ObjectId, ref: "artistSchema", required: true},
    name: {type: String, required: true}

});

const bandSchema = new Schema({

    _id : {type: Schema.Types.ObjectId, ref: "bandSchema", required: true},
    name: {type: String, required: true}

});

const audioSchema = new Schema({

    _audio_id : Schema.Types.ObjectId,
    title: {type: String, required: true},
    filename: {type: String, required: true},
    file_path: {type: String, required: true},
    file_size: {type: Number, required: true},
    authors: [authorSchema],
    band: bandSchema,
    record: {type: Schema.Types.ObjectId, ref: "recordSchema", required: false},
    record_position: {type: Number, required: false},
    duration: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

}, {collection: "audio"});

exports.audioModel = mongoose.model("AudioModel", audioSchema);