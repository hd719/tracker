import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date }) => {
  const [complete, setComplete] = useState(false);
  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      <button onClick={() => setComplete(!complete)}>
        {complete ? "X" : "O"}
      </button>
      <style jsx>
        {`
          span {
            display: flex;
            flex-direction: column;
          }
          span + span {
            margin-left: 10px;
          }
          button {
            margin-top: 1rem;
            border: none;
          }
        `}
      </style>
    </span>
  );
};

export default HabitButton;
