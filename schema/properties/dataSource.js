
const crypto = require('crypto');
let { properties } = require('../../data');
const { PropertyNotFoundError } = require('../../errors');

function getPropertyById(propertyId) {
    return properties.find(
        (property) => property.id === propertyId
    );
}

function createProperty(property) {
    const newProperty = {
        available: property.available,
        city: property.city,
        description: property.description,
        id: crypto.randomUUID(),
        name: property.name,
        photos: property.photos || [],
        propertyOwner: property.propertyOwner,
        rating: 0,
        renters: property.renters || []
    };

    properties = [
        ...properties,
        newProperty
    ];
    return newProperty;
}

function updateProperty(propertyId, updatedProperty) {
    const foundPropertyIndex = properties.findIndex(
        (aProperty) => aProperty.id === propertyId
    )

    if (foundPropertyIndex < 0) {
        return PropertyNotFoundError(propertyId)
    }

    properties[foundPropertyIndex] = {
        ...properties[foundPropertyIndex],
        ...updatedProperty
    };

    return {
        __typename: 'Property',
        ...properties[foundPropertyIndex]
    };
}

function getAllProperties() {
    return properties;
}

module.exports = {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
}