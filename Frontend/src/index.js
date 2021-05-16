import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Route from "./routes/route";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor} from "./redux/store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
