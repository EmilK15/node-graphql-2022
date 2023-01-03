
const crypto = require('crypto');
let { renters } = require('../../data');

function getRenterById(renterId) {
    return renters.find((renter) => renter.id === renterId);
}

function createRenter(renter) {
    const newRenter = {
        city: renter.city,
        id: crypto.randomUUID(),
        name: renter.name,
        rating: 0,
        roommates: renter.roommates || []
    };
    renters = [
        ...renters,
        newRenter
    ];
    return newRenter;
}

function getAllRenters() {
    return renters;
}

module.exports = {
    getRenterById,
    createRenter,
    getAllRenters
}