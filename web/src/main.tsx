import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider";
import { TokenCounterWidget } from "./TokenCounterWidget";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppsSDKUIProvider linkComponent="a">
            <TokenCounterWidget />
        </AppsSDKUIProvider>
    </React.StrictMode>
);
