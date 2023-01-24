import moment from "moment";

export const getDataFromRenovaciones = (renovaciones, type) => {

    if(renovaciones!==undefined &&renovaciones !==null &&  renovaciones.length > 0){

        const aux = renovaciones.map(item=>({
            fechaRenovacion: moment(item.fechaRenovacion, "YYYY-MM-DD"),
            fechaActivacion: moment(item.fechaActivacion, "YYYY-MM-DD"),
            costo: item.costo
        }))
        const sortedArray = aux.sort((a, b) => a.fechaRenovacion.diff(b.fechaRenovacion))
        const lastRenovacion = sortedArray[sortedArray.length - 1]
        switch(type){
            case 'fechaRenovacion':
                //console.log(lastRenovacion.fechaRenovacion)
                return lastRenovacion.fechaRenovacion;
            case 'fechaActivacion':
                return lastRenovacion.fechaActivacion;
            case 'anualidad':
                return lastRenovacion.costo
            default:
                return;
        }
    }else{
        return null;
    }

}