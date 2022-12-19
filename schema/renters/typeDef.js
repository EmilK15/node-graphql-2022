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

    type Query {
        renters: [Renter]
    }

    type Mutation {
        createRenter(createRenterInput: CreateRenterInput): Renter
    }
`

module.exports = {
    typeDefs
}
