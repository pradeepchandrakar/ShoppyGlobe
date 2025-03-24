import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

// Mount the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux Provider for Global State Management */}
    <Provider store={store}>
      {/* React Router for Navigation */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



