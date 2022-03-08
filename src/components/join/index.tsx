import { Form, Input, Button, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinRoom, startGame, verifyRoom } from "../../socketio.service";
import { RootState } from "../../store";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Join = () => {
  const dispatch = useDispatch();
  const { user: { vip }, room: { users } } = useSelector<RootState, RootState["roomReducer"]>(
    (state) => state.roomReducer
  );
  
  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>("vertical");
  const [name, setName] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [roomFound, setRoomFound] = useState<boolean>(false);
  const [joinedGame, setJoinedGame] = useState<boolean>(false);

  const handleRoomCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value.toUpperCase());
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase());
  };

  const handleJoinRoom = () => {
    joinRoom(roomCode, name, (successful, user, room) => {
      if (successful) {
        dispatch({ type: "UPDATE_ROOM", payload: room });
        dispatch({ type: "SET_USER", payload: { id: user.id, vip: user.vip } });
        setJoinedGame(true);
      }
    });
  };

  useEffect(() => {
    setRoomFound(true);
    setTimeout(() => {
      if (roomCode.length === 4) {
        verifyRoom(roomCode, (roomFound) => {
          setRoomFound(roomFound);
        });
      }
    }, 100);
  }, [roomCode]);

  const handleStartGame = () => {
    startGame(roomCode, room => {
      dispatch({ type: 'UPDATE_ROOM', payload: room });
    });
  };

  return (
    <Form form={form} layout={formLayout} size="large">
      <Form.Item label="ROOM CODE" style={{ fontWeight: "bold" }}>
        <span style={{ float: "right", marginTop: -25, fontStyle: "italic" }}>
          {!joinedGame && roomCode.length === 4 && !roomFound
            ? "Room not found"
            : null}
        </span>
        <Input
          value={roomCode}
          onChange={handleRoomCodeChange}
          maxLength={4}
          placeholder="ENTER 4-LETTER CODE"
          disabled={joinedGame}
        />
      </Form.Item>
      <Form.Item label="NAME" style={{ fontWeight: "bold" }}>
        <span style={{ float: "right", marginTop: -25 }}>
          {!joinedGame && 12 - name.length}
        </span>
        <Input
          value={name}
          onChange={handleNameChange}
          maxLength={12}
          minLength={1}
          placeholder="ENTER YOUR NAME"
          disabled={joinedGame}
        />
      </Form.Item>
      <Form.Item>
        <Row justify="center" align="middle">
          {joinedGame && !vip ? (
            <div>Joined</div>
          ) : (
            <Button
              style={{ width: "75%" }}
              type="ghost"
              disabled={
                !roomCode ||
                roomCode.length < 4 ||
                !name ||
                !roomFound ||
                (joinedGame && !vip)
              }
              onClick={vip ? handleStartGame : handleJoinRoom}
            >
              {vip ? "EVERYBODY'S IN" : "PLAY"}
            </Button>
          )}
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Join;
