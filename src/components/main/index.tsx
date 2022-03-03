import { useSelector } from "react-redux";
import { Col } from "antd";
import { RootState } from "../../store";
import Join from "../join";
import Play from "../play";
import "./index.css";

const Main = () => {
  const { room } = useSelector<RootState, RootState["roomReducer"]>(
    (state) => state.roomReducer
  );

  return (
    <div id="main">
      <Col xs={20} sm={15} md={10} lg={5}>
        {room.started ? <Play /> : <Join />}
      </Col>
    </div>
  );
};

export default Main;
