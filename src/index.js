import React from "react";
import ReactDOM from "react-dom/client";

// style
import "./index.css";

//components
import App from "./App";

//pakages
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

//axios config
axios.interceptors.response.use((response) => {
    if (
        response.request.responseURL ===
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h"
    ) {
        return response.data;
    }
    return response;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
