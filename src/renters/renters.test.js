require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields } = require('../../test/helpers/fragments');

const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function createRenter(createRenterInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            mutation CreateRenter($createRenterInput: CreateRenterInput) {
                createRenter(createRenterInput: $createRenterInput) {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `,
        variables: { createRenterInput }
    },
    { contextValue });
}

async function renters() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            query Renters {
                renters {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `},
    { contextValue });
}

async function getRenterById(renterId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            query GetRenterById($renterId: ID!) {
                getRenterById(renterId: $renterId) {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `,
        variables: {
            renterId
        }
    },
    { contextValue });
}

describe('Renter entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createRenterInput = {
        city: "Test City" + seedValue,
        name: "Test renter name" + seedValue,
        roommates: []
    };

    describe('Renter - Create', () => {
        it('creates a renter and verifies it was created', async() => {
            const response = await createRenter(createRenterInput);
            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data.createRenter).toEqual({
                ...createRenterInput,
                id: expect.any(String),
                rating: 0
            });
        })
    })

    describe('Renter - Read', () => {
        it('queries to retrieve all renters', async() => {
            const { body } = await renters();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.renters)).toBe(true);
        })

        it('queries for the renter created previously using getRenterById', async() => {
            const createRenterResponse = await createRenter(createRenterInput);

            const createdRenterId = createRenterResponse.body.singleResult.data.createRenter.id;
            const { body } = await getRenterById(createdRenterId);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getRenterById).toEqual({
                ...createRenterInput,
                id: createdRenterId,
                rating: 0
            });
        })
    })
})