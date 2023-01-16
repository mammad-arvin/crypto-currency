import React ,{useEffect, useState, createContext} from 'react';

//GET SERVICE
import getAPIdata from '../services/getAPIdata';

//context
export const APIdataContext=createContext();


const APIcontext = ({children}) => {
    const [data,setData]=useState([]);

    useEffect(()=>{
        const getData=async ()=>{
            setData(await getAPIdata());
        }
        getData();
    },[])
    return(
        <APIdataContext.Provider value={data} >
            {children}
        </APIdataContext.Provider>
    )
};

export default APIcontext;