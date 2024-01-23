"use client";
import dayjs from 'dayjs';
import React from 'react';
import { dayBookedInfo } from '../utils/dayBookedInfo';
import { useState, useEffect } from 'react';

function TodayBooked() {
    const [documents, setDocuments] = useState([]);
    const [renderTable, setRenderTable] = useState([]);

    const getDailyData = async () => {
        const today = dayjs();
        const response = await fetch('/api/booking?month=' + String(today.month() + 1) + '&date=' + String(today.date()) + '&year=' + String(today.year()), {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
            }
        });

        const data = await response.json();
        console.log(response.status);
        //console.log(data);

        return data;
    }

    const getWeeklyData = async () => {
        const today = dayjs();
        const dow = today.day();
        const response = await fetch('/api/weekly?week=' + dow, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
            }
        });

        const data = await response.json();
        //console.log(data);

        return data;
    }
    
    useEffect(() => {
        const fetchDocuments = async () => {
            const dailyBooked = await getDailyData();
            const weeklyBooked = await getWeeklyData();

            const dailyTimeTable = await dayBookedInfo(dailyBooked);
            const weeklyTimeTable = await dayBookedInfo(weeklyBooked);

            let newdocuments;

            newdocuments = dailyTimeTable;

            for(var i = 9; i <= 27; i++) {
                if(weeklyTimeTable[i][0] != "empty") {
                    newdocuments[i][0] = weeklyTimeTable[i][0];
                    newdocuments[i][1] = weeklyTimeTable[i][1];
                }
            }
            setDocuments(newdocuments);
        };

        fetchDocuments();
    }, []);

    console.log(documents);

    const test = documents[9] ? documents[9][0] : 'Loading...';

    
    

    return (
        <div>
            {
                renderTable.map((item, index) => (
                    <div key={index+9} style={{backgroundColor: item[0]}}>
                        {item[1]}
                    </div>
                ))
            }
        </div>
    )
}

export default TodayBooked;

{/*
let table = Array(19);
    
            for(let i = 0; i < 19; i++) {
                table[i] = Array(2);
            }
    
            for(let i = 0; i < 19; i++) {
                if(documents[i + 9][0] === "per") {
                    table[i][0] = "red";
                }
                else if(documents[i + 9][0] === "team") {
                    table[i][0] = "blue";
                }
                else if(documents[i + 9][0] === "pro") {
                    table[i][0] = "green";
                }
                else if(documents[i + 9][0] === "les") {
                    table[i][0] = "yellow";
                }
                else {
                    table[i][0] = "none";
                }
    
                if(documents[i + 9][1] != "info") {
                    table[i][1] = documents[i + 9][1];
                }
                else {
                    table[i][1] = ' ';
                }
            }
*/}