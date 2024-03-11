"use client";
import React from 'react';
import NewBookingForm from "../components/NewBookingForm";
import Link from 'next/link';

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
    return (
        <div className="container-sm mt-3">
             <Link href="/" style={{
              color: 'black',
              textDecoration: 'none',
            }}>
              <div style={{display: 'flex',}}>
                <div style={{
                  fontSize: '32px'
                }}>
                  P
                </div>
                <div style={{
                  fontSize: '14px',
                  paddingTop: '4px',
                  paddingLeft: '2px'
                }}>
                  hoebus<br />
                  lanner
                </div>
              </div>
            </Link>
            <NewBookingForm onAddBooking={addBookedHandler} />
        </div>
    );
}