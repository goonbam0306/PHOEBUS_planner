"use client"
import React, { forwardRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { startOfWeek, endOfWeek, format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

function DateBooked() {
    const [timeTable, setTimeTable] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const time = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '1:00', '2:00', '3:00', '4:00'];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getWeekRange = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 0 }); // 일요일이 주의 시작으로 설정
        const end = endOfWeek(date, { weekStartsOn: 0 }); // 토요일이 주의 끝으로 설정
        return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
      };

    const CalanderCustom = forwardRef(({ value, onClick }, ref) => (
        <button 
            className=" btn btn-secondary" 
            onClick={onClick} 
            ref={ref}
            style = {{

            }}    
        >
            {value}
        </button>
    ));
    CalanderCustom.displayName = 'CalanderCustom';

    useEffect(() => {
        const getTimeTable = async () => {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/bookConfirm?year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth()}&date=${selectedDate.getDate()}&dow=${selectedDate.getDay()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application.json',
                }
            });

            const data = await response.json();

            setTimeTable(data);
        }

        getTimeTable();
    }, [selectedDate]);

    return (
        <div>
            <div className="container-sm mb-3">
                <div>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={handleDateChange}
                        customInput={<CalanderCustom />}
                    />
                </div>
                <div>
                    예약 확인 날짜 선택
                </div>
            </div>
            <div className="bookedTable">
                <div>
                    {getWeekRange(selectedDate)}
                </div>
                <div className="weekBox">
                    {week.map((subWeek, i) => (
                        <div key={i} className="week">
                            {subWeek}
                        </div>
                    ))}
                </div>
                <div style = {{display: 'flex'}}>
                    <div className="timeTable">
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
