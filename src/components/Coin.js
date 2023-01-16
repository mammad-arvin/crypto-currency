import React from "react";

//components
import { Link } from "react-router-dom";

//satyle
import "./Coin.scss";
import styled from "styled-components";

// style of styled components
const Change24Div = styled.div`
    span {
        display: inline-block;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 2px 5px;
        color: ${(props) => (props.val >= 0 ? "#15D1C6" : "#F26672")};
        background-color: ${(props) =>
            props.val >= 0 ? "#DCF8F7" : "#FFECEE"};
        border-radius: 2px;
    }
`;

const Coin = ({
    id,
    rank,
    name,
    image,
    symbol,
    price,
    change24,
    setChartShow,
}) => {
    return (
        <Link to={`/${id}`} onClick={() => setChartShow(true)}>
            <div className="coinContainer">
                <div className="rank">{rank}</div>
                <div className="name">
                    <img src={image} alt="img" />
                    <div>
                        <span>{name}</span>
                        <span>{symbol.toUpperCase()}</span>
                    </div>
                </div>
                <div className="currentPrice">
                    {price}
                    <span>USD</span>
                </div>
                <Change24Div val={change24} className="change24h">
                    <span>
                        {change24 > 0 ? (
                            <span>
                                <i className="fa-solid fa-turn-up"></i>+
                            </span>
                        ) : (
                            <i className="fa-solid fa-arrow-turn-down"></i>
                        )}
                        {change24.toFixed(2)}%
                    </span>
                </Change24Div>

                <div className="monthlyChart">
                    <span>See</span>
                </div>
            </div>
        </Link>
    );
};

export default Coin;
