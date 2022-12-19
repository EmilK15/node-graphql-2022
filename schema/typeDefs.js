const typeDefs = `#graphql
    type Renter {
        id: ID
        name: String!
        city: String!
        rating: Float
        roommates: [Renter]
    }

    input CreateRenterInput {
        name: String!
        city: String!
        # need ID to attach roommate to renter
        roommates: [ID]
    }

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

    type PropertyOwner {
        id: ID
        name: String!
        address: String!
        rating: Int
        properties: [Property]
        photo: String
    }

    input CreatePropertyOwnerInput {
        name: String!
        address: String!
        # this ID is optional, maybe propertyOwner created first, then property added later
        properties: [ID]
        photo: String
    }

    type Query {
        renters: [Renter]
        properties: [Property]
        propertyOwners: [PropertyOwner]
    }

    type Mutation {
        createRenter(createRenterInput: CreateRenterInput): Renter
        createProperty(createPropertyInput: CreatePropertyInput): Property
        createPropertyOwner(createPropertyOwnerInput: CreatePropertyOwnerInput): PropertyOwner
    }
`;


module.exports = {
    typeDefs
};