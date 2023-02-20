const Prisma = require('./src/prisma');

const renters = [
    {
        name: 'renter 1',
        city: 'Toronto',
        rating: 4.0,
        v: 0
    },
    {
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        v: 0
    }
];

const propertyOwners = [
    {
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        photo: 'something',
        v: 0
    },
    {
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        photo: 'something',
        v: 0
    }
];

const properties = [
    {
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        available: true,
        description: 'amazing place 1',
        photos: [],
        v: 0
    },
    {
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        available: true,
        description: 'amazing place 2',
        photos: [],
        v: 0
    }
];

async function runSeed() {
    try {
        // create two renters, one of which is roommates with the second nested renter
        const firstRenter = await Prisma.renters.create({
            data: {
                ...renters[0],
                roommates: {
                    create: renters[1]
                }
            },
            include: {
                roommates: true
            }
        });
        // connect renter 2 to be a roommate of renter 1
        const secondRenter = await Prisma.renters.update({
            where: {
                id: firstRenter.roommates[0].id
            },
            data: {
                roommates: {
                    connect: [{ id: firstRenter.id }]
                }
            },
            include: {
                roommates: true
            }
        });

        // Create propertyOwners with connected properties
        // then connect renters to properties
        await Prisma.propertyOwners.create({
            data: {
                ...propertyOwners[0],
                properties: {
                    create:  {
                        ...properties[0],
                        renters: {
                            connect: [{ id: firstRenter.id }]
                        }
                    }
                }
            },
            include: {
                properties: true
            }
        });

        await Prisma.propertyOwners.create({
            data: {
                ...propertyOwners[1],
                properties: {
                    create: {
                        ...properties[1],
                        renters: {
                            connect: [{ id: secondRenter.id }]
                        }
                    }
                }
            },
            include: {
                properties: true
            }
        });

        return;
    } catch (err) {
        console.error('runSeed error', err);
    } finally {
        console.log('done');
    }
}

runSeed();