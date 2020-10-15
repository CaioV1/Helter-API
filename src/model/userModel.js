const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

    _userId: Schema.Types.ObjectId,
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

}, {collection:"user"});

exports.userModel = mongoose.model("UserModel", userSchema);