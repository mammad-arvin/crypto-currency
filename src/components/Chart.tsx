import React, { useEffect, useState } from "react";

// packages
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

//components
import MiniLaoding from "./MiniLoading";
//style
import "./Chart.scss";

// packages for chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ setShow }) => {
    // get id from Params
    const param = useParams();
    const id = param.id;

    const [data, setData] = useState<ChartData<"line">>();
    const [options, setOptions] = useState<ChartOptions<"line">>({
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `monthly Chart of ${id.toUpperCase()}`,
            },
        },
    });

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
            )
            .then((response) => {
                setData({
                    labels: response.data.prices.map((price: number[]) => {
                        return moment.unix(price[0]).format("MM-DD");
                    }),
                    datasets: [
                        {
                            label: `${id.toUpperCase()}`,
                            data: response.data.prices.map(
                                (price: number[]) => {
                                    return price[1];
                                }
                            ),
                            borderColor: "rgb(99, 143, 255)",
                            backgroundColor: "rgba(99, 148, 255, 0.5)",
                        },
                    ],
                });
            });
    });

    const deleteChart = () => {
        setShow(false);
    };

    return (
        <div className="chartContainer">
            <div className="chart">
                {data ? (
                    <Line options={options} data={data} />
                ) : (
                    <div
                        style={{
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MiniLaoding />
                    </div>
                )}
            </div>
            <p onClick={deleteChart}>Back</p>
        </div>
    );
};

export default Chart;
