module.exports = {
    RenterFields: `
        fragment RenterFields on Renter {
            city
            id
            name
            rating
        }
    `,
    PropertyOwnerFields: `
        fragment PropertyOwnerFields on PropertyOwner {
            id
            name
            address
            rating
            photo
            properties {
                ...PropertyFields
            }
        }
    `,
    PropertyFields: `
        fragment PropertyFields on Property {
            id
            name
            city
            description
            photos
            rating
            renters {
                ...RenterFields
            }
        }
    `
}