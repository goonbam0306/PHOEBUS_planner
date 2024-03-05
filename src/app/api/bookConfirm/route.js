import { currentYear } from '@/app/utils/currentYear';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function GET(request) {
    const year = parseInt(request.nextUrl.searchParams.get('year'));
    const month = parseInt(request.nextUrl.searchParams.get('month'));
    const date = parseInt(request.nextUrl.searchParams.get('date'));
    const dow = parseInt(request.nextUrl.searchParams.get('dow'));

    let timeTable = new Array(7);

    for(let i = 0; i < timeTable.length; i++) {
        timeTable[i] = new Array(19);
        for(let j = 0; j < timeTable[i].length; j++) {
            timeTable[i][j] = new Array(2);
            timeTable[i][j][0] = 'white';
            timeTable[i][j][1] = ' ';
        }
    }

    let dateInfo = dayjs(`${year}-${month + 1}-${date}`);

    dateInfo = dateInfo.subtract(dow, 'day');

    const client = await MongoClient.connect('mongodb+srv://kbumj2003:bj3163113@cluster-phoebusplanner.rjdwy4s.mongodb.net/');

    const db = client.db('test');

    const bookedCollection = db.collection('booked');

    for(let i = 0; i < 7; i++) {
        let currentYearPrint = String(dateInfo.year());
        let currentMonth = String(dateInfo.month() + 1);
        let currentDate = String(dateInfo.date());
        const bookedInfo = await bookedCollection.find({year: currentYearPrint, month: currentMonth, date: currentDate, weekly: 'false'}).toArray();

        bookedInfo.forEach(document => {
            const startTime = parseInt(document.startTime) - 9;
            const useTime = parseInt(document.useTime);
            let useType = document.type;
            const user = document.info;

            switch (useType) {
                case "per":
                    useType = '#FAD2E1';
                    break;
                case "team":
                    useType = '#BEE1E6';
                    break;
                case "pro":
                    useType = '#FFF1E6';
                    break;
                case "les":
                    useType = '#CDDAFD';
                    break;
            }

            timeTable[i][startTime][1] = user;

            for(let j = startTime; j < startTime + useTime; j++) {
                timeTable[i][j][0] = useType;
            }
        })

        dateInfo = dateInfo.add(1, 'day');
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
                useType = '#FAD2E1';
                break;
            case "team":
                useType = '#BEE1E6';
                break;
            case "pro":
                useType = '#FFF1E6';
                break;
            case "les":
                useType = '#CDDAFD';
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