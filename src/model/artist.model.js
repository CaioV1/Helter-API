const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = Schema({

    _artist_id: Schema.Types.ObjectId,
    artistic_name: {type: String, required: true},
    complete_name: {type: String, required: true},
    main_band: { type: Schema.Types.ObjectId, ref: "bandSchema", required: false},
    birthDate: {type: Date, required: true},
    originCountry: {type: String, required: true},
    imageName: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

}, {collection: "artist"});

const artistModel = mongoose.model("ArtistModel", artistSchema);
module.exports = artistModel;