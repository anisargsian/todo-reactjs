const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        userId: Schema.ObjectId,
        message: String
    }
);

module.exports = mongoose.model("Data", DataSchema);