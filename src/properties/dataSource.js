const { Property } = require('../models');
const { PropertyNotFoundError } = require('../../errors');

async function getPropertyById(propertyId) {
    return Property.findById(propertyId)
        .populate('renters propertyOwner');
}

async function createProperty(property) {
    const newProperty = new Property({
        available: property.available,
        city: property.city,
        description: property.description,
        name: property.name,
        photos: property.photos || [],
        propertyOwner: property.propertyOwnerId,
        rating: 0,
        renters: property.renters || []
    });

    const savedProperty = await newProperty.save();

    return savedProperty
        .populate('renters propertyOwner');
}

async function updateProperty(propertyId, updatedProperty) {
    const savedProperty = await Property.findByIdAndUpdate(
        propertyId,
        updatedProperty,
        { new: true }
    ).populate('renters propertyOwner');

    if (!savedProperty) {
        return PropertyNotFoundError(propertyId);
    }
    return {
        __typename: 'Property',
        id: savedProperty.id,
        available: savedProperty.available,
        city: savedProperty.city,
        description: savedProperty.description,
        name: savedProperty.name,
        photos: savedProperty.photos,
        propertyOwner: savedProperty.propertyOwnerId,
        rating: savedProperty.rating,
        renters: savedProperty.renters
    }
}

async function getAllProperties() {
    return Property.find({})
        .populate('renters propertyOwner');
}

module.exports = {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
};
