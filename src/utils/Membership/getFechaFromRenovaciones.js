export const getFechaFromRenovaciones = (renovaciones, type) => {

    if(renovaciones!==undefined &&renovaciones !==null &&  renovaciones.length > 0){
        const lastRenovacion = renovaciones[renovaciones.length - 1]
        switch(type){
            case 'fechaRenovacion':
                return lastRenovacion.fechaRenovacion;
            case 'fechaActivacion':
                return lastRenovacion.fechaActivacion;
            default:
                return;
        }
    }else{
        return null;
    }

}