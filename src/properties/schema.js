const typeDefs = `#graphql
    type Property {
        id: ID!
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        rating: Float @cacheControl(maxAge: 60)
        renters: [Renter]
        propertyOwner: PropertyOwner! @cacheControl(maxAge: 60)
    }

    input CreatePropertyInput {
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        # need ID to attach renter to renters
        renters: [ID]
        propertyOwnerId: ID!
    }

    input UpdatePropertyInput {
        id: ID!
        name: String
        city: String
        available: Boolean
        description: String
        photos: [String]
        rating: Float
        # need ID to attach renter to renters
        renters: [ID]
        propertyOwner: ID
    }

    type PropertyNotFoundError implements Error {
        message: String!
        propertyId: ID!
    }

    type Query {
        getPropertyById(propertyId: ID!): Property
        properties: [Property]
    }

    union UpdatePropertyResult = Property | PropertyNotFoundError

    type Mutation {
        createProperty(createPropertyInput: CreatePropertyInput): Property
        updateProperty(updatePropertyInput: UpdatePropertyInput): UpdatePropertyResult
    }
`;


module.exports = {
    typeDefs
};