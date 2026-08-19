import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { persistor, store } from "./store/store.js";
import router from "./app/router.jsx";
import AuthInitializer from "./features/auth/AuthInitilaizer";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
