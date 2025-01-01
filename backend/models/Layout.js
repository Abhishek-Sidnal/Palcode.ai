const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    layout: { type: Object, required: true },
});

module.exports = mongoose.model("Layout", LayoutSchema);
