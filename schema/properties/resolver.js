const {
    getPropertyById,
    createProperty,
    getAllProperties
} = require('./dataSource');
const {
    getPropertyOwnerById
} = require('../propertyOwners/dataSource');
const {
    getRenterById
} = require('../renters/dataSource');

const resolvers = {
    Property: {
        renters(parent, _args, _context) {
            return parent.renters.map((renterId) => getRenterById(renterId));
        },
        propertyOwner(parent, _args, _context) {
            return getPropertyOwnerById(parent.propertyOwner);
        }
    },
    Query: {
        getPropertyById: (_parent, args) => {
            return getPropertyById(args.propertyId);
        },
        properties: () => getAllProperties()
    },
    Mutation: {
        createProperty: (_parent, args) => {
            return createProperty(args.createPropertyInput);
        }
    }
};

module.exports = {
    resolvers
};