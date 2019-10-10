const mongoose = require("mongoose");
const AreaSchema = mongoose.Schema;

const Area = new AreaSchema({
  year: { type: String, required: true },
  month: {
    type: String,
    enum: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ],
    required: true
  },
  lipoData: [
    {
      mapId: { type: Number, required: true },
      mean: { type: Number, required: true },
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    }
  ]
});

module.exports = MandaLipo = mongoose.model("mandalipo", Area);
