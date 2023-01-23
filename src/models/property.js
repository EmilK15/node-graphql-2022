const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    city: {
        type: String,
        required: true
    },
    available: Boolean,
    description: {
        type: String,
        maxLength: 250
    },
    photos: [String],
    rating: {
        type: Number,
        required: true
    },
    renters: [{
        type: Schema.Types.ObjectId,
        ref: "Renter"
    }],
    propertyOwner: {
        type: Schema.Types.ObjectId,
        ref: "PropertyOwner"
    }
});

const Property = model("Property", propertySchema);

module.exports = {
    Property
};
