function PropertyNotFoundError(propertyId) {
    return {
        __typename: 'PropertyNotFoundError',
        message: 'Unable to find property with associated id.',
        propertyId
    };
};

module.exports = {
    PropertyNotFoundError
};
