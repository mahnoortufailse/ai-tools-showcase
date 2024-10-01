const mongoose = require("mongoose");

const iconSchema = new mongoose.Schema({
  iconType: {
    type: String,
    required: true,
    set: (value) => {
      // Ensure `mdi:` prefix is added if missing
      if (!value.startsWith("mdi:")) {
        return `mdi:${value}`;
      }
      return value;
    },
  },
  color: String,
  size: String,
  generatedIcon: String,
});

const Icon = mongoose.model("Icon", iconSchema);

module.exports = Icon;
