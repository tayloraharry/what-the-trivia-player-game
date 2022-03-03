import { IRoomObject } from "what-the-trivia-types";

export type UpdateRoomAction = { type: "UPDATE_ROOM"; payload: IRoomObject };
export type SetUserIdAction = { type: "SET_USER"; payload: { id: number, vip: boolean } };

export type RoomAction = UpdateRoomAction | SetUserIdAction;

export const updateRoom = (room: IRoomObject): UpdateRoomAction => ({
  type: "UPDATE_ROOM",
  payload: room,
});

export const setUserId = (id: number, vip: boolean): SetUserIdAction => ({
  type: "SET_USER",
  payload: {
    id,
    vip,
  },
});