const typeDefs = `

    scalar JSON

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
        appointmentTime: [Int!]
        services: [Services]
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

    type Calendar {
        year: Int!
        January: [Days]!
        February: [Days]!
        March: [Days]!
        April: [Days]!
        May: [Days]!
        June: [Days]!
        July: [Days]!
        August: [Days]!
        September: [Days]!
        October: [Days]!
        November: [Days]!
        December: [Days]!
    }

    type Days {
        day: Int!
        weekday: Int!
        open: Boolean!
    }

    type Schedule {
        year: Int!
        January: [DayPlans]!
        February: [DayPlans]!
        March: [DayPlans]!
        April: [DayPlans]!
        May: [DayPlans]!
        June: [DayPlans]!
        July: [DayPlans]!
        August: [DayPlans]!
        September: [DayPlans]!
        October: [DayPlans]!
        November: [DayPlans]!
        December: [DayPlans]!
    }

    type DayPlans {
        day: Int!
        timeSlots: [timeSlots]!
    }

    type timeSlots {
        time: Int!
        available: Boolean!
    }

    input DayData {
        day: Int!
        weekday: Int!
        open: Boolean!
    }

    input timeSlotData {
        time: Int!
        available: Boolean!
    }

    input DayPlanData {
        day: Int!
        timeSlots: timeSlotData!
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
        schedule(year: Int!, month: String!, day: Int!): [timeSlots]
        calendar: [Calendar]
        getCalendarMonth(year: Int!, month: String!): [Days]
    }

    type Mutation {
        addUser(fullName: String!, email: String!, phone: String!, password: String!, position: String!): Auth

        updateUser(userId: ID!, fullName: String, email: String, phone: String, password: String, position: String): Auth

        deleteUser(userId: ID!): User

        login(phone: String, email: String, password: String!): Auth

        addReservation(name: String!, email: String!, phone: String!, day: String!, appointmentTime: [Int!], services: [serviceData!], specialRequests: String, payment: paymentData!): Reservation

        updateReservation(reservationId: ID!, name: String!, email: String!, phone: String!, day: String!, appointmentTime: [Int!], services: serviceData!, specialRequests: String, payment: paymentData!): Reservation

        cancelReservation(reservationId: ID!): Reservation

        addCalendarYear(year: Int!, January: [DayData]!, February: [DayData]!, March: [DayData]!, April: [DayData]!, May: [DayData]!, June: [DayData]!, July: [DayData]!, August: [DayData]!, September: [DayData]!, October: [DayData]!, November: [DayData]!, December: [DayData]!): Calendar

        addScheduleYear(year: Int!, January: [DayPlanData]!, February: [DayPlanData]!, March: [DayPlanData]!, April: [DayPlanData]!, May: [DayPlanData]!, June: [DayPlanData]!, July: [DayPlanData]!, August: [DayPlanData]!, September: [DayPlanData]!, October: [DayPlanData]!, November: [DayPlanData]!, December: [DayPlanData]!): Schedule

        calendarDayOpenStatus(year: Int!, month: String!, day: Int!, open: Boolean!): Calendar

        updateScheduleDay(year: Int!, month: String!, day: Int!, openingTime: Int!, closingTime: Int!): DayPlans
    }
`;

module.exports = typeDefs;