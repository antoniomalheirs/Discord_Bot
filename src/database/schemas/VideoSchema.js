const { Schema } = require("mongoose");

module.exports = new Schema({
  youtube: {
    type: String,
    required: true,
    unique: true,
  },
  channel: { type: String },
  lastVideo: { type: String },
  lastPublish: { type: String },
  message: { type: String },
});
