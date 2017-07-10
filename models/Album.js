var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Number,
    required: true
  },
  label: {
    type: String
  },
  genre: {
    type: String,
    default: "unknown",
    enum: ["Rock", "Jazz", "Blues", "Hip-Hop", "Country", "Other"]
  },
  single: [
    {
      title: String,
      track: Number
    }
  ]
});

module.exports = mongoose.model("Album", albumSchema);
