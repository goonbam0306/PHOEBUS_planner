"use client";
import React from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { dayBookedInfo } from '../utils/dayBookedInfo';
import { bookedComplete } from '../utils/bookedComplete';
import { Switch, useCheckboxState } from 'pretty-checkbox-react';

import '@djthoms/pretty-checkbox';

function NewBookingForm(props) {
    //예약일 받기
    const [selectedDate, setSelectedDate] = useState(null);
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(null);

    const weeklyState = useCheckboxState();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1); 
        setDay(date.getDate());
        setDayOfWeek(date.getDay());
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredYear = String(year);
        const enteredMonth = String(month);
        const enteredDate = String(day);
        const enteredDayOfWeek = String(dayOfWeek);
        const enteredStartTime = event.target['startTime'].value;
        const enteredUseTime = event.target['useTime'].value;
        const enteredType = event.target['type'].value;
        const enteredInfo = event.target['info'].value;

        if(enteredInfo.trim() === '') {
            Swal.fire({
                icon: "error",
                text: "예약자 이름이나 곡 제목을 입력해주세요!",
            })

            return;
        }

        const getDailyData = async () => {
            const response = await fetch('/api/booking?month=' + enteredMonth + '&date=' + enteredDate + '&year=' + enteredYear, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application.json',
                }
            });

            const data = await response.json();
            //console.log(data);

            return data;
        }

        const getWeeklyData = async () => {
            const response = await fetch('/api/weekly?week=' + enteredDayOfWeek, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application.json',
                }
            });

            const data = await response.json();

            return data;
        }

        let enteredBookData;

        if(weeklyState.state) {
            enteredBookData = {
                year: enteredYear,
                month: enteredMonth,
                date: enteredDate,
                week: enteredDayOfWeek,
                startTime: enteredStartTime,
                useTime: enteredUseTime,
                type: enteredType,
                info: enteredInfo,
                weekly: 'true'
            };
        }
        else {
            enteredBookData = {
                year: enteredYear,
                month: enteredMonth,
                date: enteredDate,
                week: enteredDayOfWeek,
                startTime: enteredStartTime,
                useTime: enteredUseTime,
                type: enteredType,
                info: enteredInfo,
                weekly: 'false'
            };
        }

        if(enteredYear === 'null') {
            Swal.fire({
                icon: "error",
                text: "날짜를 입력해주세요."
            })

            return;
        }

        const today = dayjs();
        const intEnteredYear = parseInt(enteredYear);
        const intEnteredMonth = parseInt(enteredMonth);
        const intEnteredDate = parseInt(enteredDate);

        if(intEnteredYear <= today.year()) {
            if(intEnteredMonth <= today.month() + 1) {
                if(intEnteredDate < today.date()){
                    if(!weeklyState.state){
                        Swal.fire({
                            icon: "error",
                            text: "오늘보다 이른 날짜를 입력하셨습니다. 다시 확인해주세요."
                        })

                        return;
                    }
                }
            }
        }

        const dayDupConfig = await getDailyData();

        const weekDupConfig = await getWeeklyData();

        const dayTimeTable = await dayBookedInfo(dayDupConfig);

        const weekTimeTable = await dayBookedInfo(weekDupConfig);

        var intStartTime = parseInt(enteredStartTime);
        var intUseTime = parseInt(enteredUseTime);

        console.log(dayTimeTable);

        for(var i = intStartTime; i < intStartTime + intUseTime; i++) {
            if(dayTimeTable[i][0] != "empty" || weekTimeTable[i][0] != "empty") {
                Swal.fire({
                    icon:"error",
                    text: "해당 시간에 이미 예약이 잡혀있습니다! 다시 확인해주세요."
                })

                return;
            }
        }

        props.onAddBooking(enteredBookData);

        bookedComplete();
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText='예약 날짜를 선택하세요'
                />
                <br />
                <Switch {...weeklyState}></Switch>매주 예약하기
            </div>
            <div>
                <label>시작 시간을 선택해주세요.<br />
                <select id='startTime'>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                </select>
                </label>
            </div>
            <div>
                <label>사용 시간을 선택해주세요<br />
                <select id='useTime'>
                    <option value="1">1시간</option>
                    <option value="2">2시간</option>
                    <option value="3">3시간</option>
                    <option value="4">4시간</option>
                </select>
                </label>
            </div>
            <div>
                <label>사용 유형을 선택해주세요<br />
                <select id='type'>
                    <option value="per">개인 연습</option>
                    <option value="team">팀곡 연습</option>
                    <option value="pro">프로젝트</option>
                    <option value="les">레슨</option>
                </select>
                </label>
            </div>
            <label>예약자 이름이나 곡 제목을 입력해주세요
                <input type="text" id="info" />
            </label>
            <div>
                <button type="submit">예약하기!</button>
            </div>
        </form>
    )
}

export default NewBookingForm;