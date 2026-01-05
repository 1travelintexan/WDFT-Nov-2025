import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeWrapper } from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeWrapper>
);
