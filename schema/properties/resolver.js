let { properties } = require('../../data');

const resolvers = {
    Query: {
        properties: () => properties
    },
    Mutation: {
        createProperty: (_parent, args) => {
            const newProperty = {
                available: args.available,
                city: args.city,
                description: args.description,
                id: crypto.randomUUID(),
                name: args.name,
                photos: args.photos || [],
                propertyOwner: args.propertyOwner,
                rating: 0,
                renters: args.renters || []
            }
            properties = [
                ...properties,
                newProperty
            ]
            return newProperty
        }
    }
};

module.exports = {
    resolvers
};