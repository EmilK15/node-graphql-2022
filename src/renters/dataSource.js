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

module.exports = {
    getRenterById,
    createRenter,
    getAllRenters
};
