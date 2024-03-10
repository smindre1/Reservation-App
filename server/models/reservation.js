const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
    },
    services: {
        type: {
            type: String,
            required: true,
        },
        client: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    specialRequests: {
        type: String,
    },
    payment: [{
        cardOwner: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: Number,
            required: true,
        },
        cardExpiration: {
            type: Number,
            required: true,
        },
        securityCode: {
            type: Number,
            required: true, 
        },
        billingAddress: {
            type: String,
            required: true,
        }
      }]
},
{ timestamps:true });

const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;
