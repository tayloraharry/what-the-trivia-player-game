import { Layout, Row } from "antd";
import "./index.css";

const Header = () => {
  return (
    <Layout.Header
      id="header"
      style={{ backgroundColor: "#fff", borderBottom: "1px solid gray" }}
    >
      <Row justify="center" align="middle" style={{ display: "flex" }}>
        <h1>¿What the Trivia?</h1>
      </Row>
    </Layout.Header>
  );
};

export default Header;
