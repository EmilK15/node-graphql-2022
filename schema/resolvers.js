const crypto = require('crypto');

let renters = [
    {
        id: crypto.randomUUID(),
        name: 'renter 1',
        city: 'Toronto',
        rating: 4,
        roommates: []
    },
    {
        id: crypto.randomUUID(),
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        roommates: []
    }
];

let propertyOwners = [
    {
        id: crypto.randomUUID(),
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    },
    {
        id: crypto.randomUUID(),
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    }
]

let properties = [
    {
        id: crypto.randomUUID(),
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[0]],
        available: true,
        description: 'amazing place 1',
        photos: [],
        propertyOwner: [propertyOwners[0]]
    },
    {
        id: crypto.randomUUID(),
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[1]],
        available: true,
        description: 'amazing place 2',
        photos: [],
        propertyOwner: [propertyOwners[1]]
    }
];

propertyOwners[0].properties.push(properties[0])
propertyOwners[1].properties.push(properties[1])

const resolvers = {
    Query: {
        renters: () => renters,
        properties: () => properties,
        propertyOwners: () => propertyOwners
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
        },
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
        },
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