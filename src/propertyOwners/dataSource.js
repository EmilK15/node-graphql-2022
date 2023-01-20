
const { PropertyOwner } = require('../models');

async function getPropertyOwnerById(propertyOwnerId) {
    return PropertyOwner.findById(propertyOwnerId)
        .populate('properties');
}

async function createPropertyOwner(propertyOwner) {
    const newPropertyOwner = new PropertyOwner({
        name: propertyOwner.name,
        address: propertyOwner.address,
        properties: propertyOwner.properties || [],
        photo: propertyOwner.photo,
        rating: 0
    });

    const savedPropertyOwner = await newPropertyOwner.save();

    return savedPropertyOwner
        .populate('properties');
}

async function getAllPropertyOwners() {
    return PropertyOwner.find({})
        .populate('properties');
}

module.exports = {
    getPropertyOwnerById,
    createPropertyOwner,
    getAllPropertyOwners
};
