const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadInfo = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  fileName: {
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

module.exports = ULInfo = mongoose.model("uploadInfos", UploadInfo);
