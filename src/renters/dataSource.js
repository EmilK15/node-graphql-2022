const { Renter } = require('../models');

async function getRenterById(renterId) {
    return Renter.findById(renterId)
        .populate('roommates');
}

async function createRenter(renter) {
    const newRenter = new Renter({
        city: renter.city,
        name: renter.name,
        rating: 0.0,
        roommates: renter.roommates || []
    });

    const savedRenter = await newRenter.save();
    return savedRenter.populate('roommates');
}

async function getAllRenters() {
    return Renter.find({})
        .populate('roommates');
}

module.exports = {
    getRenterById,
    createRenter,
    getAllRenters
};
