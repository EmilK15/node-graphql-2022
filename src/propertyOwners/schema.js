const typeDefs = `#graphql
    type PropertyOwner {
        id: ID!
        name: String!
        address: String!
        rating: Float
        properties: [Property]
        photo: String
    }

    input CreatePropertyOwnerInput {
        name: String!
        address: String!
        properties: [ID]
        photo: String
    }

    type Query {
        propertyOwners: [PropertyOwner]
        getPropertyOwnerById(propertyOwnerId: ID!): PropertyOwner
    }

    type Mutation {
        createPropertyOwner(createPropertyOwnerInput: CreatePropertyOwnerInput): PropertyOwner
    }
`

module.exports = {
    typeDefs
}
