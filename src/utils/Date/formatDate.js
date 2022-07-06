import moment from "moment";

export const formatDate = (date, fromFormat, toFormat) => {
    if (date !== null){
        return moment(date, fromFormat).format(toFormat);
    }
    return '-';
}