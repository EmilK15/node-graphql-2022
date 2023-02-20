const {
    getRenterById,
    createRenter,
    getAllRenters,
    makeRoommates
} = require('./dataSource');

const resolvers = {
    Query: {
        getRenterById: async (_parent, args) => {
            return getRenterById(args.renterId);
        },
        renters: async (_parent, _args) => {
            return getAllRenters();
        }
    },
    Mutation: {
        createRenter: async (_parent, args) => {
            return createRenter(args.createRenterInput);
        },
        makeRoommates: async (_parent, args) => {
            return makeRoommates(args.renterIds);
        }
    }
};

module.exports = {
    resolvers
};