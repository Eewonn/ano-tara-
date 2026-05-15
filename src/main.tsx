import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MobileFrame from "./components/MobileFrame.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileFrame>
      <App />
    </MobileFrame>
  </StrictMode>,
);
