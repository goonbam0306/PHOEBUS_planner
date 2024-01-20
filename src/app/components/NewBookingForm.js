"use client";
import React from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { dayBookedInfo } from '../utils/dayBookedInfo';
import { currentYear } from '../utils/currentYear';
import { bookedComplete } from '../utils/bookedComplete';

function NewBookingForm(props) {
    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredYear = event.target['year'].value;
        const enteredMonth = event.target['month'].value;
        const enteredDate = event.target['date'].value;
        const enteredStartTime = event.target['startTime'].value;
        const enteredUseTime = event.target['useTime'].value;
        const enteredType = event.target['type'].value;
        const enteredInfo = event.target['info'].value;

        if(enteredDate.trim() === '') {
            Swal.fire({
                icon: "error",
                text: "예약일을 입력해주세요!",
            })

            return;
        }

        if(enteredInfo.trim() === '') {
            Swal.fire({
                icon: "error",
                text: "예약자 이름이나 곡 제목을 입력해주세요!",
            })

            return;
        }

        const getData = async () => {

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

        const enteredBookData = {
            year: enteredYear,
            month: enteredMonth,
            date: enteredDate,
            startTime: enteredStartTime,
            useTime: enteredUseTime,
            type: enteredType,
            info: enteredInfo
        };

        if(enteredMonth == 2 || enteredMonth == 4 || enteredMonth == 6 || enteredMonth == 9 || enteredMonth == 11) {
            if(enteredDate > 30 || enteredDate < 1) {
                Swal.fire({
                    icon:"error",
                    text: "날짜 입력이 잘못되었습니다! 다시 확인해주세요."
                })

                return;
            }
        }
        else {
            if(enteredDate > 31 || enteredDate < 1) {
                Swal.fire({
                    icon:"error",
                    text: "날짜 입력이 잘못되었습니다! 다시 확인해주세요."
                })

                return;
            }
        }

        const today = dayjs();
        const intEnteredYear = parseInt(enteredYear);
        const intEnteredMonth = parseInt(enteredMonth);
        const intEnteredDate = parseInt(enteredDate);

        if(intEnteredYear <= today.year()) {
            if(intEnteredMonth <= today.month() + 1) {
                if(intEnteredDate < today.date()){
                    Swal.fire({
                        icon: "error",
                        text: "오늘보다 이른 날짜를 입력하셨습니다. 다시 확인해주세요."
                    })

                    return;
                }
            }
        }

        const dupConfig = await getData();

        const dayTimeTable = await dayBookedInfo(dupConfig);

        var intStartTime = parseInt(enteredStartTime);
        var intUseTime = parseInt(enteredUseTime);

        console.log(dayTimeTable);

        for(var i = intStartTime; i < intStartTime + intUseTime; i++) {
            if(dayTimeTable[i][0] != "empty") {
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
            <label>연도
                <input 
                    type="text" 
                    id='year' 
                    defaultValue={currentYear()}
                    onChange={(e) => handleChange(e)}
                    />
            </label>
            <label>몇월?
                <select id='month'>
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                    <option value="4">4월</option>
                    <option value="5">5월</option>
                    <option value="6">6월</option>
                    <option value="7">7월</option>
                    <option value="8">8월</option>
                    <option value="9">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>
            </label>
            <label>예약일을 입력해주세요.
                <input type="text" id='date' />
            </label>
            <label>시작 시간을 선택해주세요.
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
            <label>사용 시간을 선택해주세요
            <select id='useTime'>
                <option value="1">1시간</option>
                <option value="2">2시간</option>
                <option value="3">3시간</option>
                <option value="4">4시간</option>
            </select>
            </label>
            <label>사용 유형을 선택해주세요
            <select id='type'>
                <option value="per">개인 연습</option>
                <option value="team">팀곡 연습</option>
                <option value="pro">프로젝트</option>
                <option value="les">레슨</option>
            </select>
            </label>
            <label>예약자 이름이나 곡 제목을 입력해주세요
                <input type="text" id="info" />
            </label>
                <button type="submit">예약하기!</button>
        </form>
    )
}

export default NewBookingForm;