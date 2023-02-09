
const { PropertyOwner } = require('../models');

async function getPropertyOwnerById(propertyOwnerId, Prisma) {
    return Prisma.propertyOwners.findUnique({
        where: {
            id: propertyOwnerId
        },
        include: {
            properties: true
        }
    });
}

async function createPropertyOwner(propertyOwner, Prisma) {
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

async function getAllPropertyOwners(Prisma) {
    return Prisma.propertyOwners.findMany({
        include: {
            properties: true
        }
    });
}

module.exports = {
    getPropertyOwnerById,
    createPropertyOwner,
    getAllPropertyOwners
};
