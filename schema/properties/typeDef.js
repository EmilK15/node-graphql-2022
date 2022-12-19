const typeDefs = `#graphql
    type Property {
        id: ID
        name: String!
        city: String!
        rating: Float
        renters: [Renter]
        available: Boolean
        description: String
        photos: [String]
        propertyOwner: ID!
    }

    input CreatePropertyInput {
        name: String!
        city: String!
        # need ID to attach renter to renters
        renters: [ID]
        available: Boolean
        description: String
        photos: [String]
        propertyOwner: ID!
    }

    type Query {
        properties: [Property]
    }

    type Mutation {
        createProperty(createPropertyInput: CreatePropertyInput): Property
    }
`;


module.exports = {
    typeDefs
};