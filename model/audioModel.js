const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const audioSchema = Schema({

    _audio_id : Schema.Types.ObjectId,
    title: {type: String, required: true},
    filename: {type: String, required: true},
    file_path: {type: String, required: true},
    file_size: {type: Number, required: true},
    path_image: {type: String, required: true},
    autors: {type: [Schema.Types.ObjectId], ref: "artistSchema", required: true},
    band: {type: [Schema.Types.ObjectId], ref: "bandSchema", required: false},
    record: {type: Schema.Types.ObjectId, ref: "recordSchema", required: false},
    record_position: {type: Number, required: false},
    duration: {type: Number, required: true},
    launch_date: {types: Date, required: false},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

}, {collection: "audio"});

exports.audioModel = mongoose.model("AudioModel", audioSchema);