import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combinedDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayString = `${year}-${month}-${day}`;

    return new Date(dayString + ' ' + timeString);
}
export const setActivityProps = (activity: IActivity, user: IUser) =>
{
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(a => a.userName === user.username);//the some() returns true if something is found
    activity.isHost = activity.attendees.some(a => a.userName === user.username && a.IsHost);
    return activity;
}

export const createAttendee = (user: IUser) : IAttendee => {
    return{
        displayName: user.displayName,
        IsHost: false,
        userName: user.username,
        image: user.image!
    }
}