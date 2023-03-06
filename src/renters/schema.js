const typeDefs = `#graphql
    type Renter {
        id: ID!
        name: String!
        city: String!
        rating: Float
        roommates: [Renter]
        deprecatedField: Boolean @deprecated(reason: "Use nonDeprecatedField.")
        nonDeprecatedField: Boolean
    }

    input CreateRenterInput {
        name: String!
        city: String!
        # need ID to attach roommate to renter
        roommates: [ID]
        deprecatedField: Boolean @deprecated(reason: "Use nonDeprecatedField.")
        nonDeprecatedField: Boolean
    }

    type Query {
        renters: [Renter]
        getRenterById(renterId: ID!): Renter
    }

    type Mutation {
        createRenter(createRenterInput: CreateRenterInput): Renter
        makeRoommates(renterIds: [ID]): [Renter]
        deleteRenter(renterId: ID): Boolean
    }
`

module.exports = {
    typeDefs
}
