const { Schema, model } = require('mongoose');

const propertyOwnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    properties: [{
        type: Schema.Types.ObjectId,
        ref: "Property"
    }],
    photo: String
});

const PropertyOwner = model("PropertyOwner", propertyOwnerSchema);

module.exports = {
    PropertyOwner
};
