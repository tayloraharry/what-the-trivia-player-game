import { io } from "socket.io-client";
import { IRoomObject, IRoomUserObject } from "what-the-trivia-types";
import { store } from "./store";

// const socket = io('https://what-the-trivia.herokuapp.com');
const socket = io('http://localhost:5000');

socket.on('gameUpdate', room => {
  store.dispatch({ type: 'UPDATE_ROOM', payload: room });
});

export const disconnectSocket = () => { 
  if (socket) socket.disconnect();
};

type VerifyRoomCallback = (roomFound: boolean) => void;

export const verifyRoom = (roomCode: string, cb: VerifyRoomCallback) => {
  socket.emit("verifyRoom", roomCode, (roomFound: boolean) => {
    cb(roomFound);
  });
};

type JoinRoomCallback = (
  succesful: boolean,
  user: IRoomUserObject,
  room: IRoomObject
) => void;

export const joinRoom = (
  roomCode: string,
  name: string,
  cb: JoinRoomCallback
) => {
  socket.emit(
    "joinRoom",
    { roomCode, name },
    (successful: boolean, user: IRoomUserObject, room: IRoomObject) => {
      cb(successful, user, room);
    }
  );
};

type StartGameCallback = (
  room: IRoomObject
) => void;

export const startGame = (roomCode: string, cb: StartGameCallback) => {
  socket.emit("startGame", roomCode, (room: IRoomObject) => {
    cb(room);
  });
};

export const startNextQuestion = (roomId: string) => {
  socket.emit('startNextQuestion', roomId);
};

export const submitAnswer = (roomId: string, userId: number, answer: string) => {
  socket.emit("answerSubmitted", roomId, userId, answer);
};