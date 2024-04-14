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
    }
  }
`;

export const GET_CALENDAR = gql`
  query calendar {
    calendar {
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

export const GET_CALENDAR_MONTH = gql`
  query getCalendarMonth($year: Int!, $month: String!) {
    getCalendarMonth(year: $year, month: $month) { 
      day
      weekday
      open
    }
  }
`;

export const GET_SCHEDULE = gql`
  query schedule($year: Int!, $month: String!, $day: Int!) {
    schedule(year: $year, month: $month, day: $day) {
      time
      available
    }
  }
`;
