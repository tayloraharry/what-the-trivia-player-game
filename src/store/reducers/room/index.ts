import { getEmptyRoom, IRoomObject } from "what-the-trivia-types";
import { RoomAction } from "../../actions/room";

export interface IRoomState {
  room: IRoomObject;
  user: {
    id: number;
    vip: boolean;
  };
}

const initialState: IRoomState = {
  room: getEmptyRoom(),
  user: {
    id: 0,
    vip: false,
  },
};

export const roomReducer = (
  state: IRoomState = initialState,
  action: RoomAction
): IRoomState => {
  switch (action.type) {
    case "UPDATE_ROOM":
      return { ...state, room: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
