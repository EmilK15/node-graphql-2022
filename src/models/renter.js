const { Schema, model } = require('mongoose');

const renterSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    city: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    roommates: [{
        type: Schema.Types.ObjectId,
        ref: "Renter"
    }],
    deprecatedField: Boolean,
    nonDeprecatedField: Boolean
});

const Renter = model("Renter", renterSchema);

module.exports = {
    Renter
};
