const omit = require('lodash.omit');
const { PropertyNotFoundError } = require('../../errors');
const Prisma = require('../prisma');

async function getPropertyById(propertyId) {
    return Prisma.properties.findUnique({
        where: {
            id: propertyId
        },
        include: {
            renters: true,
            propertyOwner: true
        }
    });
}

async function createProperty(property) {
    return Prisma.properties.create({
            data: {
                available: property.available,
                city: property.city,
                description: property.description,
                name: property.name,
                photos: property.photos || [],
                propertyOwnerId: property.propertyOwnerId,
                rating: 0.0,
                renters: {
                    connect: property.renters.map((renterId) => ({ id: renterId }))
                },
                v: 0
            },
            include: {
                propertyOwner: true,
                renters: true
            }
        });
}

async function updateProperty(propertyId, updatedProperty) {
    const nonConnectPropertyFields = omit(updatedProperty, ['id', 'renters', 'propertyOwner']);

    const renters = updatedProperty.renters && {
        connect: updatedProperty?.renters.map((renterId) => ({ id: renterId }))
    };
    const propertyOwner = updatedProperty.propertyOwner && {
        connect: { id: updatedProperty.propertyOwner }
    };

    try {
        const savedProperty = await Prisma.properties.update({
            where: {
                id: propertyId
            },
            data: {
                ...nonConnectPropertyFields,
                ...(renters),
                ...(propertyOwner)
            },
            include: {
                renters: true,
                propertyOwner: true
            }
        });
        return {
            __typename: 'Property',
            ...savedProperty
        };

    } catch (err) {
        if (err?.meta?.cause === 'Record to update not found.') {
            return PropertyNotFoundError(propertyId);
        }
        return err;
    }
}

async function getAllProperties() {
    return Prisma.properties.findMany({
        include: {
            renters: true,
            propertyOwner: true
        }
    });
}

module.exports = {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
};
