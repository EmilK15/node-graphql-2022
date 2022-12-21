function PropertyNotFoundError(propertyId) {
    return {
        __type: 'PropertyNotFoundError',
        message: 'Unable to find property with associated id.',
        propertyId
    }
}

module.exports = {
    PropertyNotFoundError
}