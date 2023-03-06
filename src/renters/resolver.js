const {
    getRenterById,
    createRenter,
    getAllRenters,
    makeRoommates,
    deleteRenter
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
        },
        makeRoommates: async (_parent, args, { prisma }) => {
            return makeRoommates(args.renterIds, prisma);
        },
        deleteRenter: async (_parent, args, { prisma }) => {
            return deleteRenter(args.renterId, prisma);
        }
    }
};

module.exports = {
    resolvers
};