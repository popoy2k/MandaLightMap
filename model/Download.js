const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DownloadInfo = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usersColl"
  },
  fileName: {
    type: String,
    required: true
  },
  fileSlug: {
    type: String,
    required: true
  },
  extName: {
    type: String,
    required: true
  },
  requestedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = DLInfo = mongoose.model("downloadInfo", DownloadInfo);
