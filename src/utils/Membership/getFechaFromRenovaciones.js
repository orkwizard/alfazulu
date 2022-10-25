export const getDataFromRenovaciones = (renovaciones, type) => {

    if(renovaciones!==undefined &&renovaciones !==null &&  renovaciones.length > 0){
        const lastRenovacion = renovaciones[renovaciones.length - 1]
        switch(type){
            case 'fechaRenovacion':
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