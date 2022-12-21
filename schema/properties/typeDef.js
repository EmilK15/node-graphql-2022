const typeDefs = `#graphql
    type Property {
        id: ID
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        rating: Float
        renters: [Renter]
        propertyOwner: PropertyOwner!
    }

    input CreatePropertyInput {
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        # need ID to attach renter to renters
        renters: [ID]
        propertyOwner: ID!
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