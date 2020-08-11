const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema({

    _recordId: Schema.Types.ObjectId,
    title: {type: String, required: true},
    artist: { type: Schema.Types.ObjectId, ref: "artistSchema", required: false},
    band: { type: Schema.Types.ObjectId, ref: "bandSchema", required: false},
    launch_date: {type: Date, required: true},
    pathImage: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

}, {collection: "record"});

exports.recordModel = mongoose.model("RecordModel", recordSchema);