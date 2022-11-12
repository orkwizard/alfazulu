import { useEffect } from "react";
import { useState } from "react";
import { getMembresiById } from "../helpers/backend_helper";

function useGetMembresia(membresiaId){
    const [membresia, setMembresia] = useState(null)
    useEffect(() => {
        if(membresiaId){
            async function getMembresiaAPI() {
                let response = await getMembresiById(membresiaId);
                if(response.state){
                    setMembresia(response.data)
                }
            }
            getMembresiaAPI()
        }
    }, [membresiaId])

    return membresia;
}

export default useGetMembresia;