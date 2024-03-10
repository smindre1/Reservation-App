const typeDefs = `
    type User {
        _id: ID!
        fullName: String!
        email: String!
        phone: String!
        password: String!
        position: String!
    }

    type Reservation {
        _id: ID!
        name: String!
        email: String!
        phone: String!
        appointmentTime: String!
        services: [Services]
        specialRequests: String
        payment: Payment
    }

    type Services {
        type: String!
        client: String!
        price: Number!
    }

    type Payment {
        _id: ID!
        cardOwner: String!
        cardNumber: Number!
        cardExpiration: Number!
        securityCode: Number!
        billingAddress: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input serviceData {
        type: String!
        client: String!
        price: Number!
    }

    input paymentData {
        cardOwner: String!
        cardNumber: Number!
        cardExpiration: Number!
        securityCode: Number!
        billingAddress: String!
    }

    type Query {
        users: [User]
        me: User
        reservations: [Reservation]
        reservation(reservationId: ID!): Reservation
    }

    type Mutation {
        addUser(fullName: String!, email: String!, phone: String!, password: String!, position: String!): Auth

        updateUser(fullName: String!, email: String!, phone: String!, password: String!, position: String!): Auth

        login(phone: String, email: String, password: String!): Auth

        addReservation(name: String!, email: String!, phone: String!, appointmentTime: String!, services: serviceData!, specialRequests: String, payment: paymentData!): Reservation

        updateReservation(name: String!, email: String!, phone: String!, appointmentTime: String!, services: serviceData!, specialRequests: String, payment: paymentData!): Reservation

        cancelReservation(reservationId: ID!): Reservation
    }
`;

module.exports = typeDefs;