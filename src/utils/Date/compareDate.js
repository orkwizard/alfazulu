
export const compareDate = (currentDate, dateToCompare) =>{
    if(currentDate.isBefore(dateToCompare)){
        return "menor"
    }else if(currentDate.isAfter(dateToCompare)){
        return "mayor"
    }else{
        return "igual"
    }
}