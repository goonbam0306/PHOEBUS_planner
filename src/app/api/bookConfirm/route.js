import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const year = request.nextUrl.searchParams.get('year');
    const month = request.nextUrl.searchParams.get('month');
    const date = request.nextUrl.searchParams.get('date');
    const dow = request.nextUrl.searchParams.get('dow');

    let timeTable = new Array(7);

    for(let i = 0; i < timeTable.length; i++) {
        timeTable[i] = new Array(19);
        for(let j = 0; j < timeTable[i].length; j++) {
            timeTable[i][j] = new Array(2);
        }
    }

    let dateInfo = new Date(year, month, date);

    dateInfo.setDate(dateInfo.getDate() - dow);

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    for(let i = 0; i < 7; i++) {
        const bookedInfo = await bookedCollection.find({year: dateInfo.getFullYear(), month: (dateInfo.getMonth() + 1), date: dateInfo.getDate(), weekly: 'false'}).toArray();

        bookedInfo.forEach(document => {
            const startTime = parseInt(document.startTime) - 9;
            const useTime = parseInt(document.useTime);
            let useType = document.type;
            const user = document.info;

            switch (useType) {
                case "per":
                    useType = 'red';
                    break;
                case "team":
                    useType = 'blue';
                    break;
                case "pro":
                    useType = 'green';
                    break;
                case "les":
                    useType = 'magenta';
                    break;
            }

            timeTable[i][startTime][1] = user;

            for(let j = startTime; j < startTime + useTime; j++) {
                timeTable[i][j][0] = useType;
            }
        })
    }

    const weeklyBookedInfo = await bookedCollection.find({weekly: 'true'}).toArray();

    weeklyBookedInfo.forEach(document => {
        const dow = parseInt(document.week);
        const startTime = parseInt(document.startTime) - 9;
        const useTime = parseInt(document.useTime);
        let useType = document.type;
        const user = document.info;

        switch (useType) {
            case "per":
                useType = 'red';
                break;
            case "team":
                useType = 'blue';
                break;
            case "pro":
                useType = 'green';
                break;
            case "les":
                useType = 'magenta';
                break;
        }

        timeTable[dow][startTime][1] = user;

        for(let j = startTime; j < startTime + useTime; j++) {
            timeTable[dow][j][0] = useType;
        }
    })

    client.close();

    return NextResponse.json({timeTable});
}