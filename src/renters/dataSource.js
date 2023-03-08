async function getRenterById(renterId, Prisma) {
    return Prisma.renters.findUnique({
        where: {
            id: renterId
        },
        include: {
            roommates: true
        }
    });
}

async function createRenter(renter, Prisma) {
    return Prisma.renters.create({
        data: {
            city: renter.city,
            name: renter.name,
            rating: 0.0,
            roommates: {
                connect: renter.roommates.map((renterId) => ({ id: renterId }))
            },
            v: 0
        },
        include: {
            roommates: true
        }
    });
}

async function getAllRenters(Prisma) {
    return Prisma.renters.findMany({
        include: {
            roommates: true
        }
    });
}

// Takes a list of renterIds and ensures that each renter
// contains a roommates field that has all the ids provided
async function makeRoommates(renterIds, Prisma) {
    const connectionRenterIds = renterIds.map((renterId) => ({ id: renterId }));
    const updates = renterIds.map((renterId) => Prisma.renters.update({
        where: {
            id: renterId
        },
        data: {
            roommates: {
                connect: connectionRenterIds.filter(({ id }) => id !== renterId)
            }
        },
        include: {
            roommates: true
        }
    }));
    return Prisma.$transaction(updates);
}

async function deleteRenter(renterId, Prisma) {
    // disconnect relationship between roommate and renter
    await Prisma.renters.update({
        where: {
            id: renterId
        },
        data: {
            roommates: {
                set: []
            }
        }
    });
    // now delete renter
    const deletedRenter = await Prisma.renters.delete({
        where: {
            id: renterId
        }
    });

    return Boolean(deletedRenter.id);
}

module.exports = {
    getRenterById,
    createRenter,
    getAllRenters,
    makeRoommates,
    deleteRenter
};
