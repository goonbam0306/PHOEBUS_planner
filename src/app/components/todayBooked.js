"use client"
import dayjs from 'dayjs';

function TodayBooked() {
    const today = dayjs();
    const getTimeTable = async () => {
        const response = await fetch('http://localhost:3000/api/bookConfirm?year=' + today.year() + '&month=' + (today.month() + 1) + '&date=' + today.date() + '&dow=' + today.day(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
            }
        });

        const data = await response.json();

        return data;
    }

    const timeTable = getTimeTable();

    console.log(timeTable)

    return (
        <div>

        </div>
    )
}

export default TodayBooked;