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

export const GET_CALENDAR = gql`
  query calendar {
    schedule {
      year
      January {
        day
        weekday
        open
      }
      February {
        day
        weekday
        open
      }
      March {
        day
        weekday
        open
      }
      April {
        day
        weekday
        open
      }
      May {
        day
        weekday
        open
      }
      June {
        day
        weekday
        open
      }
      July {
        day
        weekday
        open
      }
      August {
        day
        weekday
        open
      }
      September {
        day
        weekday
        open
      }
      October {
        day
        weekday
        open
      }
      November {
        day
        weekday
        open
      }
      December {
        day
        weekday
        open
      }
    }
  }
`;

export const GET_SCHEDULE = gql`
  query schedule {
    schedule {
      year
      January {
        day
        timeSlots {
          time
          available
        }
      }
      February {
        day
        timeSlots {
          time
          available
        }
      }
      March {
        day
        timeSlots {
          time
          available
        }
      }
      April {
        day
        timeSlots {
          time
          available
        }
      }
      May {
        day
        timeSlots {
          time
          available
        }
      }
      June {
        day
        timeSlots {
          time
          available
        }
      }
      July {
        day
        timeSlots {
          time
          available
        }
      }
      August {
        day
        timeSlots {
          time
          available
        }
      }
      September {
        day
        timeSlots {
          time
          available
        }
      }
      October {
        day
        timeSlots {
          time
          available
        }
      }
      November {
        day
        timeSlots {
          time
          available
        }
      }
      December {
        day
        timeSlots {
          time
          available
        }
      }
    }
  }
`;
