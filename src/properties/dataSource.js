const { Property } = require('../models');
const { PropertyNotFoundError } = require('../../errors');
const PrismaLocal = require('../prisma');

async function getPropertyById(propertyId, Prisma) {
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

async function createProperty(property, Prisma) {
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

async function updateProperty(propertyId, updatedProperty, Prisma) {
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

async function getAllProperties(Prisma) {
    return Property.find({})
        .populate('renters propertyOwner');
}

module.exports = {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
};
