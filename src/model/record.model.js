const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "bandSchema", required: false, name: String },
  name: { type: String, required: true }
});

const recordSchema = new Schema({
  _recordId: Schema.Types.ObjectId,
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "artistSchema", required: false },
  band: bandSchema,
  launch_date: { type: Date, required: true },
  pathImage: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
}, { collection: "record" });

const recordModel = mongoose.model("RecordModel", recordSchema);
module.exports = recordModel;