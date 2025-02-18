import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </StrictMode>
);
