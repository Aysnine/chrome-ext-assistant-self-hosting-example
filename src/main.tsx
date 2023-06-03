import React from "react";
import ReactDOM from "react-dom/client";
import App from "./mockApp/App.tsx";
import RuntimeEventBridge from "./components/RuntimeEventBridge.tsx";

import "./mockApp/index.css";

import "./inject.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RuntimeEventBridge>
      <App />
    </RuntimeEventBridge>
  </React.StrictMode>
);
