import React, { useContext, useState } from "react";

//components
import Coin from "./Coin";

// pakages
import { Outlet } from "react-router-dom";

//context
import { APIdataContext } from "../contexts/APIcontext";

//style
import "./Coins.scss";
import MiniLoading from "./MiniLoading";

const Coins = ({ Show, setShow }) => {
    //context
    const data = useContext(APIdataContext);

    //get most price changed
    let i = 0;
    let most = data.filter((item) => {
        if (item.price_change_percentage_24h > i) {
            i = item.price_change_percentage_24h;
            return item;
        }
    });
    most = most.sort()[most.length - 1];

    //state for serchbox
    const [searchVal, setSearchVal] = useState("");
    const searchHandler = (ev) => {
        setSearchVal(ev.target.value);
    };

    return (
        <div className="coinsContainer">
            <header>
                <h2>Current price of cryptocurrencies</h2>
            </header>
            <main>
                {most && (
                    <article className="most">
                        <div className="upPrice">
                            <div className="contentContainer">
                                <h3>most price change 24h</h3>
                                <div className="coinContent">
                                    <img src={most.image} alt="img" />
                                    <div>
                                        <p className="coinName">{most.name}</p>
                                        <p className="coinPrice">
                                            {most.current_price}
                                            <span>USD</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="percentage">
                                +{most.price_change_percentage_24h.toFixed(1)}%
                            </div>
                        </div>
                    </article>
                )}

                <article>
                    <div className="searchContainer">
                        <input
                            type="text"
                            value={searchVal}
                            onChange={searchHandler}
                            placeholder="search"
                        />
                    </div>
                </article>

                <article className="coinsArtic">
                    <div className="overview">Market based USD</div>
                    <div className="coinsList">
                        <p>
                            <span style={{ width: "2%" }}>#</span>
                            <span style={{ width: "38%" }}>Name</span>
                            <span style={{ width: "25%" }}>Current Price</span>
                            <span style={{ width: "20%" }}>change 24h</span>
                            <span style={{ width: "15%" }}>Chart</span>
                        </p>
                        {data.length ? (
                            data.map(
                                (item) =>
                                    item.id
                                        .toLowerCase()
                                        .includes(searchVal.toLowerCase()) && (
                                        <div key={item.id} className="coin">
                                            <Coin
                                                key={item.id}
                                                id={item.id}
                                                rank={item.market_cap_rank}
                                                name={item.name}
                                                image={item.image}
                                                symbol={item.symbol}
                                                price={item.current_price}
                                                change24={
                                                    item.price_change_percentage_24h
                                                }
                                                setChartShow={setShow}
                                            />
                                        </div>
                                    )
                            )
                        ) : (
                            <div style={{ margin: "60px 0" }}>
                                <MiniLoading />
                            </div>
                        )}
                    </div>
                </article>
                {Show && <Outlet className="Outlet" />}
            </main>
        </div>
    );
};

export default Coins;
