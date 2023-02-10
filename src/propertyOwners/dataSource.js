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
