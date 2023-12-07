const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = Schema({

  _band_id: Schema.Types.ObjectId,
  name: { type: String, require: true },
  originCountry: { type: String, required: true },
  typeMusic: {
    type: String,
    enum: ["Rock",
      "Funk",
      "Soul",
      "Pop",
      "Hip Hop",
      "Samba",
      "Disco",
      "Country",
      "Folk",
      "Diversos"],
    default: "Diversos"
  },
  pathImage: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }

}, { collection: "band" });

const bandModel = mongoose.model("BandModel", bandSchema);
module.exports = bandModel;