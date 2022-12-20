const {
    createPropertyOwner,
    getAllPropertyOwners,
    getPropertyOwnerById
} = require('./dataSource');
const {
    getPropertyById
} = require('../properties/dataSource')

const resolvers = {
    PropertyOwner: {
        properties(parent, _args) {
            return parent.properties.map((propertyId) => getPropertyById(propertyId));
        }
    },
    Query: {
        getPropertyOwnerById: (_parent, args) => {
            return getPropertyOwnerById(args.propertyOwnerId);
        },
        propertyOwners: () => getAllPropertyOwners()
    },
    Mutation: {
        createPropertyOwner: (_parent, args) => {
            return createPropertyOwner(args.createPropertyOwnerInput);
        }
    }
};

module.exports = {
    resolvers
};