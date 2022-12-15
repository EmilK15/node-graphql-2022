let books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    }
];

const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        addBook: (_context, args) => {
            books = [...books, { title: args.title, author: args.name }]
            return { title: args.title, author: args.name }
        }
    }
};

module.exports = {
    resolvers
};