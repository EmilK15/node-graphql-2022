const {
    getRenterById,
    createRenter,
    getAllRenters
} = require('./dataSource');

const resolvers = {
    Renter: {
        roommates(parent) {
            return parent.roommates.map((roommateId) => getRenterById(roommateId));
        }
    },
    Query: {
        getRenterById: (_parent, args) => {
            return getRenterById(args.renterId);
        },
        renters: () => getAllRenters()
    },
    Mutation: {
        createRenter: (_parent, args) => {
            return createRenter(args.createRenterInput);
        }
    }
};

module.exports = {
    resolvers
};