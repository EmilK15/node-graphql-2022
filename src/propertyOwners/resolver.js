const {
    createPropertyOwner,
    getAllPropertyOwners,
    getPropertyOwnerById
} = require('./dataSource');

const resolvers = {
    Query: {
        getPropertyOwnerById: (_parent, args) => {
            return getPropertyOwnerById(args.propertyOwnerId);
        },
        propertyOwners: (_parent, _args) => getAllPropertyOwners()
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