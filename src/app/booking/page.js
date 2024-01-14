"use client";
import React from 'react';
import NewBookingForm from "../components/NewBookingForm";

export default function Booking() {
    async function addBookedHandler(enteredBookData) {
        //const dataConfig = JSON.stringify(enteredBookData);
        //console.log(dataConfig);
        const response = await fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enteredBookData),
        });

        const data = await response.json();
        console.log(data);
    }
    return <NewBookingForm onAddBooking={addBookedHandler} />;
}