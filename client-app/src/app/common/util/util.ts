export const combinedDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayString = `${year}-${month}-${day}`;

    return new Date(dayString + ' ' + timeString);
}