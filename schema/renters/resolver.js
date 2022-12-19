let { renters } = require('../../data');

const resolvers = {
    Query: {
        renters: () => renters
    },
    Mutation: {
        createRenter: (_parent, args) => {
            const newRenter = {
                city: args.city,
                id: crypto.randomUUID(),
                name: args.name,
                rating: 0,
                roommates: args.roommates || []
            }
            renters = [
                ...renters,
                newRenter
            ]
            return newRenter
        }
    }
};

module.exports = {
    resolvers
};