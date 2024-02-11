"use client"
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function DateBooked() {
    const today = dayjs();
    const [timeTable, setTimeTable] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const time = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 24:00', '24:00 - 1:00', '1:00 - 2:00', '2:00 - 3:00', '3:00 - 4:00'];

    const handleDateChange = (date) => {
        const chosenDate = dayjs(date);
        const startOfWeek = chosenDate.startOf('week').toDate(); // 일요일
        const endOfWeek = chosenDate.endOf('week').toDate(); // 토요일
        
        console.log(startOfWeek);
        console.log(endOfWeek);
        console.log(date);
        setSelectedDate(date);
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    };

    useEffect(() => {
        const getTimeTable = async () => {
            const response = await fetch('http://localhost:3000/api/bookConfirm?year=' + today.year() + '&month=' + today.month() + '&date=' + today.date() + '&dow=' + today.day(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application.json',
                }
            });

            const data = await response.json();

            setTimeTable(data);
        }

        getTimeTable();
    }, []);

    return (
        <div>
            <div>
                <DatePicker 
                selected={selectedDate} 
                onChange={handleDateChange} 
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                />
            </div>
            <div className="bookedTable">
                <div className="weekBox">
                    {week.map((subWeek, i) => (
                        <div key={i} className="week">
                            {subWeek}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="timeTableContent">
                        {time.map((subTime, i) => (
                            <div key={i} className="time">
                                {subTime}
                            </div>
                        ))}
                    </div>
                    <div className="timeTableContent">
                        {timeTable === null ? (
                            "예약 현황 불러오는 중..."
                        ) : (
                            timeTable.timeTable.map((subTimeTable, i) => (
                            <div key={i} className="timeTableWeek">
                                {subTimeTable.map((bookedTable, j) => (
                                    <div key={j} className="timeTableTime" style={{backgroundColor: bookedTable[0]}}>
                                        {bookedTable[1]}
                                    </div>
                                ))}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateBooked;
