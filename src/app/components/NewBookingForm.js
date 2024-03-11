"use client";
import React, { forwardRef } from 'react';
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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(null);

    const weeklyState = useCheckboxState();

    useEffect(() => {
        const switchElement = document.getElementById('flexSwitchCheckDefault');
        // 여기에 switchElement를 사용하는 로직을 추가합니다.
      }, []);
    

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1); 
        setDay(date.getDate());
        setDayOfWeek(date.getDay());
    }

    const CalanderCustom = forwardRef(({ value, onClick }, ref) => (
        <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={onClick} 
            ref={ref}
            style = {{

            }}    
        >
            {value}
        </button>
    ));
    CalanderCustom.displayName = 'CalanderCustom';

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

        if(switchElement.checked) {
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
        <form onSubmit={submitHandler} className="container-sm">
            <div className="row mt-4">
                <div className="row mb-3">
                    <div className="col">
                            <label className="form-label">
                                날짜를 선택해주세요
                            </label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
                            customInput={<CalanderCustom />}
                        />
                    </div>
                    <div className="col">
                        <div className="form-check form-switch">
                            <div className="row">
                                <div className="col ml-2">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                </div>
                                <div classname="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">매주 예약하기</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label className="form-label">
                                시작 시간을 선택해주세요
                            </label>
                            <select id='startTime' className="form-select">
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
                        </div>
                        <div className="col-6">
                            <label className="form-label">
                                사용 시간을 선택해주세요
                            </label>
                            <select id='useTime' className="form-select">
                                <option value="1">1시간</option>
                                <option value="2">2시간</option>
                                <option value="3">3시간</option>
                                <option value="4">4시간</option>
                            </select>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">
                            사용 유형을 선택해주세요
                        </label>
                        <select id='type' className="form-select">
                            <option value="per">개인 연습</option>
                            <option value="team">팀곡 연습</option>
                            <option value="pro">프로젝트</option>
                            <option value="les">레슨</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label">
                            예약자/곡명 입력
                        </label>
                            <input type="text" id="info" className="form-control" />
                    </div>
                </div>
                <div className="container text-center">
                    <div className="row mt-4">
                        <div className="col-sm-6">
                            <button type="submit" className="btn btn-primary">예약하기!</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
      
    )
}

export default NewBookingForm;