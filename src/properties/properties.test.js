require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const omit = require('lodash.omit');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields, PropertyFields } = require('../../test/helpers/fragments');
const { createPropertyOwner } = require('../propertyOwners/dataSource')
const { createRenter } = require('../renters/dataSource')


const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function properties() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            query Properties {
                properties {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `
    },
    { contextValue });
};

async function createProperty(createPropertyInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            mutation Mutation($createPropertyInput: CreatePropertyInput) {
                createProperty(createPropertyInput: $createPropertyInput) {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `,
        variables: { createPropertyInput }
    },
    { contextValue });
};

async function updateProperty(updatePropertyInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            mutation UpdateProperty($updatePropertyInput: UpdatePropertyInput) {
                updateProperty(updatePropertyInput: $updatePropertyInput) {
                    ...on PropertyNotFoundError {
                        message
                        propertyId
                    }
                    ...on Property {
                        ...PropertyFields
                        propertyOwner {
                            id
                            name
                            address
                            rating
                            photo
                        }
                    }
                }
            }
        `,
        variables: { updatePropertyInput }
    },
    { contextValue });
};

async function getPropertyById(propertyId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            query GetPropertyById($propertyId: ID!) {
                getPropertyById(propertyId: $propertyId) {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `,
        variables: {
            propertyId
        }
    },
    { contextValue });
};

describe('Property entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createPropertyInput = {
        available: true,
        city: 'Test Property City - ' + seedValue,
        renters: [],
        name: 'Test Property Name - ' + seedValue,
        description: 'Test Property Decription - ' + seedValue
    };

    const createPropertyOwnerInput = {
        address: 'Test PO Address - ' + seedValue,
        name: 'Test Landlord - ' + seedValue,
        photo: 'some photo' + seedValue,
        properties: []
    };

    const createRenterInput = {
        city: 'Test City' + seedValue,
        name: 'Test renter name' + seedValue,
        roommates: []
    };

    describe('Property - Read', () => {
        let createdProperty;
        beforeAll(async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            createdProperty = body.singleResult.data.createProperty;
        });

        it('Retrieves all properties', async() => {
            const { body } = await properties();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.properties)).toBe(true);
        });

        it('Retrieves the created property with getPropertyById', async() => {
            const { body } = await getPropertyById(createdProperty.id);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getPropertyById).toEqual(createdProperty)
        });
    });

    describe('Property - Create', () => {
        it('Create a propertyOwner and a renter to create a property and tests that relationships are connected', async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.createProperty).toEqual({
                ...createPropertyInput,
                rating: 0,
                photos: [],
                id: expect.any(String),
                renters: [omit(renter, ['rentedPropertyId', 'roommateId', 'roommates', 'v'])],
                propertyOwner: omit(propertyOwner, ['properties', 'v'])
            });
        });            
    });

    describe('Property - Update', () => {
        let createdProperty;
        beforeAll(async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            createdProperty = body.singleResult.data.createProperty;
        });

        it('Updates a property with an incorrect ID and returns PropertyNotFoundError', async() => {
            const NON_EXISTANT_UUID = '63c19d15b3db1c7857b59a7c';
            const { body } = await updateProperty({ id: NON_EXISTANT_UUID });

            expect(body.singleResult.data.updateProperty).toEqual({
                message: 'Unable to find property with associated id.',
                propertyId: NON_EXISTANT_UUID
            })
        });

        it('Updates previously created property and updates non-relational fields', async() => {
            const updatesToProperty = {
                id: createdProperty.id,
                available: false,
                city: 'New Test Property City - ' + seedValue,
                name: 'New Test Property Name - ' + seedValue,
                description: 'New Test Property Decription - ' + seedValue
            };
            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty).toEqual({
                ...updatesToProperty,
                photos: [],
                propertyOwner: expect.any(Object),
                rating: 0,
                renters: expect.any(Array)
            })
        });

        it('Updates previously created property and updates renters with newly created Renter', async() => {
            const newCreatedRenterInput = {
                city: 'New - Test City' + seedValue,
                name: 'New - Test renter name' + seedValue,
                roommates: []
            };
            const renter = await createRenter(newCreatedRenterInput, prisma)
            const updatesToProperty = {
                id: createdProperty.id,
                renters: [renter.id]
            };

            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty.renters).toEqual(
                [omit(renter, ['rentedPropertyId', 'roommateId', 'roommates', 'v'])]
            )
        });

        it('Updates previously created property and updates propertyOwner with newly created propertyOwner', async() => {
            const newCreatedPropertyOwnerInput = {
                address: 'New - Test PO Address - ' + seedValue,
                name: 'New - Test Landlord - ' + seedValue,
                photo: 'New - some photo' + seedValue,
                properties: []
            };
            const propertyOwner = await createPropertyOwner(newCreatedPropertyOwnerInput, prisma)
            const updatesToProperty = {
                id: createdProperty.id,
                propertyOwnerId: propertyOwner.id
            };
            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty.propertyOwner).toEqual(
                omit(propertyOwner, ['v', 'properties'])
            )
        });
    });
});
