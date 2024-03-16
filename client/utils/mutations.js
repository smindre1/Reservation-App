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
  mutation addReservation($name: String!, $email: String!, $phone: String!, $appointmentTime: String!, $services: serviceData!, $specialRequests: String, $payment: paymentData!) {
    addReservation(name: $name, email: $email, phone: $phone, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment) {
      _id
      name
      email
      phone
      appointmentTime
      specialRequests
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation($reservationId: ID!, $name: String!, $email: String!, $phone: String!, $appointmentTime: String!, $services: serviceData!, $specialRequests: String, $payment: paymentData!) {
    updateReservation(reservationId: $reservationId, name: $name, email: $email, phone: $phone, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment) {
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

export const DEL_RESERVATION = gql`
  mutation cancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId) {
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
