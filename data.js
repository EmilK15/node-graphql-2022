const renters = [
    {
        id: 'fdbe21a8-3eb3-4a70-a3b9-357c2af5acec',
        name: 'renter 1',
        city: 'Toronto',
        rating: 4,
        roommates: []
    },
    {
        id: 'd83323ad-7dbf-4b71-8ee9-47dcf136cc18',
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        roommates: []
    }
];

// Create renter/roommate relation
renters[0].roommates.push(renters[1].id);
renters[1].roommates.push(renters[0].id);

const propertyOwners = [
    {
        id: 'c173abf2-648d-4df8-a839-b12c9117277e',
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    },
    {
        id: 'a09092cf-b99d-44c5-8dd6-68229d0258b5',
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    }
]

const properties = [
    {
        id: '86d401bb-cc8a-40f6-b3fc-396e6ddabb1a',
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[0].id],
        available: true,
        description: 'amazing place 1',
        photos: [],
        propertyOwner: propertyOwners[0].id
    },
    {
        id: 'bcc2bb10-c919-42ae-8f6c-d24dba29c62f',
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[1].id],
        available: true,
        description: 'amazing place 2',
        photos: [],
        propertyOwner: propertyOwners[1].id
    }
];

// Create propertyOwner/property relation
propertyOwners[0].properties.push(properties[0].id);
propertyOwners[1].properties.push(properties[1].id);

module.exports = {
    renters,
    propertyOwners,
    properties
}