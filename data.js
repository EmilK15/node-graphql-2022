const crypto = require('crypto');

const renters = [
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

const propertyOwners = [
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

const properties = [
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

propertyOwners[0].properties.push(properties[0]);
propertyOwners[1].properties.push(properties[1]);

module.exports = {
    renters,
    propertyOwners,
    properties
}