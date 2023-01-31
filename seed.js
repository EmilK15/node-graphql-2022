require('dotenv').config();
const mongoose = require('mongoose');
const { Property, PropertyOwner, Renter } = require('./src/models');

const renters = [
    {
        name: 'renter 1',
        city: 'Toronto',
        rating: 4.0,
        roommates: []
    },
    {
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        roommates: []
    }
];

const propertyOwners = [
    {
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    },
    {
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    }
];

const properties = [
    {
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        renters: [],
        available: true,
        description: 'amazing place 1',
        photos: [],
        propertyOwner: null
    },
    {
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        renters: [],
        available: true,
        description: 'amazing place 2',
        photos: [],
        propertyOwner: null
    }
];

async function runSeed() {

    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL);
    try {
        const newRenter = new Renter(renters[0]);
        const newRenterTwo = new Renter(renters[1]);

        // establish relationship
        newRenter.set('roommates', [newRenterTwo._id]);
        newRenterTwo.set('roommates', [newRenter._id]);
        
        await newRenter.save();
        await newRenterTwo.save();

        const newPropertyOwner = new PropertyOwner(propertyOwners[0]);
        const newPropertyOwnerTwo = new PropertyOwner(propertyOwners[1]);

        const newProperty = new Property(properties[0]);
        const newPropertyTwo = new Property(properties[1]);

        newProperty.set('renters', [newRenter._id]);
        newPropertyTwo.set('renters', [newRenterTwo._id]);
        newProperty.set('propertyOwner', [newPropertyOwner._id]);
        newPropertyTwo.set('propertyOwner', [newPropertyOwnerTwo._id]);

        newPropertyOwner.set('properties', [newProperty._id]);
        newPropertyOwnerTwo.set('properties', [newPropertyTwo._id]);

        await newPropertyOwner.save();
        await newPropertyOwnerTwo.save();

        await newProperty.save();
        await newPropertyTwo.save();

        console.log('done');
    } catch (err) {
        console.error('runSeed error', err);
    } finally {
        mongoose.connection.close();
    }
}

runSeed();