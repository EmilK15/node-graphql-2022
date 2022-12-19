let { propertyOwners } = require('../../data');

const resolvers = {
    Query: {
        propertyOwners: () => propertyOwners
    },
    Mutation: {
        createPropertyOwner: (_parent, args) => {
            const newPropertyOwner = {
                name: args.name,
                address: args.address,
                properties: args.properties || [],
                photo: args.photo
            }

            propertyOwners = [
                ...propertyOwners,
                newPropertyOwner
            ]
            return newPropertyOwner
        }
    }
};

module.exports = {
    resolvers
};