import axios from "axios";

const getAPIdata= async ()=>{
    const data=await axios
        .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h");
    return [...data];
}

export default getAPIdata;