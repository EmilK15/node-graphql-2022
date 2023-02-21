const {
    createPropertyOwner,
    getAllPropertyOwners,
    getPropertyOwnerById
} = require('./dataSource');

const resolvers = {
    Query: {
        getPropertyOwnerById: (_parent, args, { prisma }) => {
            return getPropertyOwnerById(args.propertyOwnerId, prisma);
        },
        propertyOwners: (_parent, _args, { prisma }) => getAllPropertyOwners(prisma)
    },
    Mutation: {
        createPropertyOwner: (_parent, args, { prisma }) => {
            return createPropertyOwner(args.createPropertyOwnerInput, prisma);
        }
    }
};

module.exports = {
    resolvers
};