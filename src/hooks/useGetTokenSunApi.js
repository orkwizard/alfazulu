import { useEffect } from "react";
import { useState } from "react"
import { LOGIN_SUNAPI } from "../helpers/sunapi_url";

function useGetTokenSunApi(){
    const [tokenSunApi, setTokenSunApi] = useState(null)

    
    useEffect(() => {
        if(!tokenSunApi){
            const urlLogin = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${LOGIN_SUNAPI}`;
            const credentials = {
                username: process.env.REACT_APP_SUNAPI_APIUSER,
                password: process.env.REACT_APP_SUNAPI_APIKEY,
            };

            async function getTokenSunApi(){
                const response = await fetch(urlLogin, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                const token = await response.json()
                setTokenSunApi(token.Bearer)
            }
            getTokenSunApi()
        }
    },[tokenSunApi])

    return tokenSunApi;
}

export default useGetTokenSunApi