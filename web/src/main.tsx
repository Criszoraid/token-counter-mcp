import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TokenCounterWidget } from "./TokenCounterWidget";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <TokenCounterWidget />
    </React.StrictMode>
);
