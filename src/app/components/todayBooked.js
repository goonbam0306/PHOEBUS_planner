"use client";
import dayjs from 'dayjs';
import { dayBookedInfo } from '../utils/dayBookedInfo';

async function TodayBooked() {
    const getData = async () => {
        const today = dayjs();

        const response = await fetch('/api/booking?month=' + (today.month() + 1) + '&date=' + today.date() + '&year=' + today.year(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
            }
        });

        const data = await response.json();
        //console.log(data);

        return data;
    }

    const todayInfo = await getData();

    const dayTimeTable = await dayBookedInfo(todayInfo);



    return (
        <div>
            <div>
                9:00 ~ 10:00
            </div>
        </div>
    )
}

export default TodayBooked;