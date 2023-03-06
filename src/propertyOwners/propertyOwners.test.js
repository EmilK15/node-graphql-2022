require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const omit = require('lodash.omit');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields, PropertyFields, PropertyOwnerFields } = require('../../test/helpers/fragments');

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
        address: "Test PO Address - " + seedValue,
        name: "Test Landlord - " + seedValue,
        photo: "some photo" + seedValue,
        properties: []
    };

    describe('PropertyOwner - Read', () => {
        it('retrieves all propertyOwners', async() => {
            const { body } = await propertyOwners();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.propertyOwners)).toBe(true);
        })

        it('queries for the propertyOwner created previously using getPropertyOwnerById' async() => {
            // const 
        })
    })
})