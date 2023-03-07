require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields, PropertyFields, PropertyOwnerFields } = require('../../test/helpers/fragments');
const { createProperty } = require('../properties/dataSource');

const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function createPropertyOwner(createPropertyOwnerInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            mutation CreatePropertyOwner($createPropertyOwnerInput: CreatePropertyOwnerInput) {
                createPropertyOwner(createPropertyOwnerInput: $createPropertyOwnerInput) {
                    ...PropertyOwnerFields
                }
              }
        `,
        variables: { createPropertyOwnerInput }
    },
    { contextValue });
}

async function propertyOwners() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            query PropertyOwners {
                propertyOwners {
                    ...PropertyOwnerFields
                }
            }
        `
    },
    { contextValue });
}

async function getPropertyOwnerById(propertyOwnerId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            query GetPropertyOwnerById($propertyOwnerId: ID!) {
                getPropertyOwnerById(propertyOwnerId: $propertyOwnerId) {
                    ...PropertyOwnerFields
                }
            }
        `,
        variables: {
            propertyOwnerId
        }
    },
    { contextValue });
}

describe('Property Owner entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createPropertyOwnerInput = {
        address: 'Test PO Address - ' + seedValue,
        name: 'Test Landlord - ' + seedValue,
        photo: 'some photo' + seedValue,
        properties: []
    };

    const createPropertyInput = {
        available: true,
        city: 'Test Property City - ' + seedValue,
        renters: [],
        name: 'Test Property Name - ' + seedValue,
        description: 'Test Property Decription - ' + seedValue
    };

    describe('PropertyOwner - Read', () => {
        it('Retrieves all propertyOwners', async() => {
            const { body } = await propertyOwners();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.propertyOwners)).toBe(true);
        })

        it('Queries for the propertyOwner created previously using getPropertyOwnerById', async() => {
            const result = await createPropertyOwner(createPropertyOwnerInput);

            expect(result.body.singleResult.errors).toBeUndefined();
            const createdPropertyOwner = result.body.singleResult.data.createPropertyOwner;

            const { body } = await getPropertyOwnerById(createdPropertyOwner.id);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getPropertyOwnerById).toEqual(createdPropertyOwner);
        })
    })

    describe('PropertyOwner - Create', () => {
        it('Creates a propertyOwner', async() => {
            const { body } = await createPropertyOwner(createPropertyOwnerInput);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.createPropertyOwner).toEqual({
                ...createPropertyOwnerInput,
                id: expect.any(String),
                rating: 0
            });
        });
    });
})