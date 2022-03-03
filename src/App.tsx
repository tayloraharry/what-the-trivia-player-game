import { useEffect } from "react";
import {
  disconnectSocket,
} from "./socketio.service";
import Header from "./components/header";
import { Provider } from "react-redux";
import { store } from "./store";
import "antd/dist/antd.css";
import Main from "./components/main";
import { Layout } from "antd";

const App = () => {
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Layout.Content>
          <Main/>
        </Layout.Content>
      </Layout>
    </Provider>
  );
};

export default App;
