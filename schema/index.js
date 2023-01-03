const {
    mergeTypeDefs,
    mergeResolvers
} = require('@graphql-tools/merge');

const {
    typeDefs: commonTypeDefs
} = require('./common');

const {
    resolvers: propertyResolvers,
    typeDefs: propertyTypeDefs
} = require('./properties');

const {
    resolvers: propertyOwnerResolvers,
    typeDefs: propertyOwnerTypeDefs
} = require('./propertyOwners');

const {
    resolvers: renterResolvers,
    typeDefs: renterTypeDefs
} = require('./renters');


const typeDefs = mergeTypeDefs([
    commonTypeDefs,
    propertyTypeDefs,
    propertyOwnerTypeDefs,
    renterTypeDefs
]);

const resolvers = mergeResolvers([
    propertyResolvers,
    propertyOwnerResolvers,
    renterResolvers
]);

module.exports = {
    resolvers,
    typeDefs
}