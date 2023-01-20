const {
    getRenterById,
    createRenter,
    getAllRenters
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
        }
    }
};

module.exports = {
    resolvers
};