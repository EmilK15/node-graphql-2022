
const crypto = require('crypto');
let { propertyOwners } = require('../../data');

function getPropertyOwnerById(propertyOwnerId) {
    return propertyOwners.find(
        (propertyOwner) => propertyOwner.id === propertyOwnerId
    );
}

function createPropertyOwner(propertyOwner) {
    const newPropertyOwner = {
        id: crypto.randomUUID(),
        name: propertyOwner.name,
        address: propertyOwner.address,
        properties: propertyOwner.properties || [],
        photo: propertyOwner.photo
    }

    propertyOwners = [
        ...propertyOwners,
        newPropertyOwner
    ]
    return newPropertyOwner
}

function getAllPropertyOwners() {
    return propertyOwners;
}

module.exports = {
    getPropertyOwnerById,
    createPropertyOwner,
    getAllPropertyOwners
}