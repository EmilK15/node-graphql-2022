const Prisma = require('../prisma');

async function getPropertyOwnerById(propertyOwnerId) {
    return Prisma.propertyOwners.findUnique({
        where: {
            id: propertyOwnerId
        },
        include: {
            properties: true
        }
    });
}

async function createPropertyOwner(propertyOwner) {
    return Prisma.propertyOwners.create({
        data: {
            name: propertyOwner.name,
            address: propertyOwner.address,
            properties: {
                connect: propertyOwner.properties.map((propertyId) => ({ id: propertyId }))
            },
            photo: propertyOwner.photo,
            rating: 0.0,
            v: 0
        },
        include: {
            properties: true
        }
    });
}

async function getAllPropertyOwners() {
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
