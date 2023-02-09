const {
    getRenterById,
    createRenter,
    getAllRenters
} = require('./dataSource');

const resolvers = {
    Query: {
        getRenterById: async (_parent, args, { prisma }) => {
            return getRenterById(args.renterId, prisma);
        },
        renters: async (_parent, _args, { prisma }) => {
            return getAllRenters(prisma);
        }
    },
    Mutation: {
        createRenter: async (_parent, args, { prisma }) => {
            return createRenter(args.createRenterInput, prisma);
        }
    }
};

module.exports = {
    resolvers
};