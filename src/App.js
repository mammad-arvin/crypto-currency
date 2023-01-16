import React, { useState } from "react";

//pakages
import { Routes, Route } from "react-router-dom";

//style
import "./App.css";

//componenets
import Coins from "./components/Coins";
import Chart from "./components/Chart.tsx";

//context
import APIcontext from "./contexts/APIcontext";

function App() {
    // to show and delete chart of any coin
    const [chartShow, setChartShow] = useState(true);

    return (
        <div className="App">
            <APIcontext>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Coins Show={chartShow} setShow={setChartShow} />
                        }
                    >
                        <Route
                            path=":id"
                            element={<Chart setShow={setChartShow} />}
                        />
                    </Route>
                </Routes>
            </APIcontext>
        </div>
    );
}

export default App;
