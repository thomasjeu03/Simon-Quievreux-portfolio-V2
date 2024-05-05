import React from 'react'
import App from './App'
import './style/global.scss'
import { createRoot } from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {DarkModeProvider} from "./providers/DarkModeProvider.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <DarkModeProvider>
            <App />
        </DarkModeProvider>
    </BrowserRouter>
);
