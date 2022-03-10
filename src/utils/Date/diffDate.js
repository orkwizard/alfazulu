export const diffDate = (currentDate, dateToCompare, type) =>{
    let time = currentDate.diff(dateToCompare, type)
    return time;
}