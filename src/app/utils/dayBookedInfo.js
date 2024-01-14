import { MongoClient } from 'mongodb';

export async function dayBookedInfo(enteredMonth, enteredDate) {
    const defaultTimeTable = {
        9: "empty",
        10: "empty",
        11: "empty",
        12: "empty",
        13: "empty",
        14: "empty",
        15: "empty",
        16: "empty",
        17: "empty",
        18: "empty",
        19: "empty",
        20: "empty",
        21: "empty",
        22: "empty",
        23: "empty",
        24: "empty",
        25: "empty",
        26: "empty",
        27: "empty"
    }

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    client.close();

    const bookedInfo = await bookedCollection.find({month: enteredMonth, date: enteredDate}).toArray();

    var timeTable = defaultTimeTable;

    bookedInfo.forEach(document => {
        for(var i = document.startTime; i < document.startTime + useTime;i++){
            timeTable.i = document.type;
        }
    });

    return timeTable;
}