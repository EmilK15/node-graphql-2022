const {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
} = require('./dataSource');

const resolvers = {
    Query: {
        getPropertyById: async (_parent, args, { prisma }) => {
            return getPropertyById(args.propertyId, prisma);
        },
        properties: async (_parent, _args, { prisma }) => getAllProperties(prisma)
    },
    Mutation: {
        createProperty: async (_parent, args, { prisma }) => {
            return createProperty(args.createPropertyInput, prisma);
        },
        updateProperty: async (_parent, args, { prisma }) => {
            return updateProperty(args.updatePropertyInput.id, args.updatePropertyInput, prisma);
        }
    }
};

module.exports = {
    resolvers
};