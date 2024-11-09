import "./style.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { React, StrictMode } from "react";
import AppRoutes from "./Routes/AppRoutes.js";

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
const root = ReactDOM.createRoot(document.querySelector("#root"));
const wallets = [new PetraWallet()];

root.render(
    <StrictMode>
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
            <AppRoutes />
        </AptosWalletAdapterProvider>{" "}
    </StrictMode>
);
