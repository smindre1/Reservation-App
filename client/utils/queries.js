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
    day
    appointmentTime
    email
    name
    phone
    services {
      client
      price
      type
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
        day
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

// export const GET_SCHEDULE = gql`
//   query schedule {
//     schedule {
//       year
//       January {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       February {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       March {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       April {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       May {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       June {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       July {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       August {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       September {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       October {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       November {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//       December {
//         day
//         weekday
//         open
//         timeSlots {
//           time
//           available
//         }
//       }
//     }
//   }
// `;
