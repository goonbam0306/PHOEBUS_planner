"use client";
import React from 'react';
import NewBookingForm from "../components/NewBookingForm";

export default function Booking() {
    async function addBookedHandler(enteredBookData) {
        const response = await fetch('http://localhost:3000/api/book-form', {
            method: 'POST',
            body: JSON.stringify(enteredBookData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
    }
    return <NewBookingForm onAddBooking={addBookedHandler} />;
}