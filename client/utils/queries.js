import { gql } from "@apollo/client";
//For admin use in the database to aquire user list
export const GET_EMPLOYEES = gql`
  query getEmployees {
    users {
      _id
      fullName
      email
      phone
      position
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      fullName
      email
      phone
      position
    }
  }
`;

export const GET_RESERVATIONS = gql`
  query getReservations {
    reservations {
      _id
      name
      email
      phone
      appointmentTime
      services {
        type
        client
        price
      }
      specialRequests
    }
  }
`;

export const GET_RESERVATION = gql`
  query getReservation($reservationId: ID!) {
    reservation(reservationId: $reservationId) {
        _id
        name
        email
        phone
        appointmentTime
        services {
          type
          client
          price
        }
        specialRequests
        payment {
            _id
            cardOwner
            cardNumber
            cardExpiration
            securityCode
            billingAddress
        }
    }
  }
`;
