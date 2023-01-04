const {
    getPropertyById,
    createProperty,
    getAllProperties,
    updateProperty
} = require('./dataSource');
const {
    getPropertyOwnerById
} = require('../propertyOwners/dataSource');
const {
    getRenterById
} = require('../renters/dataSource');

const resolvers = {
    Property: {
        renters(parent) {
            return parent.renters.map((renterId) => getRenterById(renterId));
        },
        propertyOwner(parent) {
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
        },
        updateProperty: (_parent, args) => {
            return updateProperty(args.updatePropertyInput.id, args.updatePropertyInput);
        }
    }
};

module.exports = {
    resolvers
};