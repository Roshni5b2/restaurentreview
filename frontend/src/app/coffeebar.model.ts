export interface Coffeebar{
    _id: {
        type: String
    },
    name:String,
    description: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    itemswithprice: {
        type: [String]
    },
    opentimings: {
        type: String
    },
    markfavourite: {
        type: String
    },
    contactnumber: {
        type: Number
    },
    emailid: {
        type: String
    },
    rating: {
        type: Number
    },
    review: {
        type: [String]
    }
}