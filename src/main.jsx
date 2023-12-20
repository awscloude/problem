import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteOptions from "./RouteOptions.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouteOptions />
    </PersistGate>
  </Provider>
);
