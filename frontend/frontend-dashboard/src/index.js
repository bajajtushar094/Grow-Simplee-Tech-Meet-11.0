import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./styles/main.scss";
import setAuthorizationToken, {
  parseJwt,
} from "./Component/Auth/setAuthorizationToken";
import { setCurrentUser } from "./redux/actions/auth";

const container = document.getElementById("root");
const root = createRoot(container);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(parseJwt(localStorage.jwtToken)));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
