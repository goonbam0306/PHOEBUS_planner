//"use client";
import Link from 'next/link'
import DateBooked from './components/DateBooked';

import global from './globals.css';

export default function Home() {
  return (
    <div>
      <div alt="main page">
        <div alt="header" className="container-sm mt-3">
          <div 
          className="d-flex justify-content-between mb-5"
          >
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
            <div alt="menu">
              <Link href="/booking">
                  <button
                    className="btn btn-outline-primary"
                  >
                    예약하러 가기
                  </button>
              </Link>
            </div>
          </div>
        </div>
        <div alt="today's use">
          <div>
            <DateBooked />
          </div>
        </div>
      </div>
    </div>
  )
}
