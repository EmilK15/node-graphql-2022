const {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
} = require('./dataSource');

const resolvers = {
    Query: {
        getPropertyById: async (_parent, args) => {
            return getPropertyById(args.propertyId);
        },
        properties: async (_parent, _args) => getAllProperties()
    },
    Mutation: {
        createProperty: async (_parent, args) => {
            return createProperty(args.createPropertyInput);
        },
        updateProperty: async (_parent, args) => {
            return updateProperty(args.updatePropertyInput.id, args.updatePropertyInput);
        }
    }
};

module.exports = {
    resolvers
};