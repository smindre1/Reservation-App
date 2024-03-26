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
        day: String!
        appointmentTime: String!
        services: Services
        specialRequests: String
        payment: Payment
    }

    type Services {
        type: String!
        client: String!
        price: Int!
    }

    type Payment {
        _id: ID!
        cardOwner: String!
        cardNumber: Int!
        cardExpiration: Int!
        securityCode: Int!
        billingAddress: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input serviceData {
        type: String!
        client: String!
        price: Int!
    }

    input paymentData {
        cardOwner: String!
        cardNumber: Int!
        cardExpiration: Int!
        securityCode: Int!
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

        updateUser(userId: ID!, fullName: String, email: String, phone: String, password: String, position: String): Auth

        deleteUser(userId: ID!): User

        login(phone: String, email: String, password: String!): Auth

        addReservation(name: String!, email: String!, phone: String!, day: String!, appointmentTime: String!, services: serviceData!, specialRequests: String, payment: paymentData!): Reservation

        updateReservation(reservationId: ID!, name: String!, email: String!, phone: String!, day: String!, appointmentTime: String!, services: serviceData!, specialRequests: String, payment: paymentData!): Reservation

        cancelReservation(reservationId: ID!): Reservation
    }
`;

module.exports = typeDefs;