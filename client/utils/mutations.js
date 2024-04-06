import { gql } from "@apollo/client";

export const LOGIN_EMPLOYEE = gql`
  mutation login($phone: String, $email: String, $password: String!) {
    login(phone: $phone, email: $email, password: $password) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addUser($fullName: String!, $email: String!, $phone: String!, $password: String!, $position: String!) {
    addUser(fullName: $fullName, email: $email, phone: $phone, password: $password, position: $position) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateUser($userId: ID!, $fullName: String, $email: String, $phone: String, $password: String, $position: String) {
    updateUser(fullName: $fullName, email: $email, phone: $phone, password: $password, position: $position) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const DEL_EMPLOYEE = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      fullName
      email
      phone
      position
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation($name: String!, $email: String!, $phone: String!, $day: String!, $appointmentTime: [Int!], $services: [serviceData!], $specialRequests: String, $payment: paymentData!) {
    addReservation(name: $name, email: $email, phone: $phone, day: $day, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment) {
      _id
      name
      email
      phone
      day
      appointmentTime
      specialRequests
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation($reservationId: ID!, $name: String!, $email: String!, $phone: String!, $day: String!, $appointmentTime: [Int!], $services: serviceData!, $specialRequests: String, $payment: paymentData!) {
    updateReservation(reservationId: $reservationId, name: $name, email: $email, phone: $phone, day: $day, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment) {
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

export const DEL_RESERVATION = gql`
  mutation cancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId) {
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

// export const ADD_YEAR = gql`
//   mutation addYear($year: Int!, $January: [Days]!, $February: [Days]!, $March: [Days]!, $April: [Days]!, $May: [Days]!, $June: [Days]!, $July: [Days]!, $August: [Days]!, $September: [Days]!, $October: [Days]!, $November: [Days]!, $December: [Days]!) {
//     addReservation(year: $year, January: $January, February: $February, March: $March, April: $April, May: $May, June: $June, July: $July, August: $August, September: $September, October: $October, November: $November, December: $December) {
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