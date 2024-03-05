//"use client";
import Link from 'next/link'
import DateBooked from './components/DateBooked';

import global from './globals.css';

export default function Home() {
  return (
    <div>
      <div alt="main page">
        <div alt="header [추후에 이미지와 텍스트 동일 선상에 두는 css 필요]">
          <div style={{
            display: 'flex'
          }}>
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
            <div style={{
              width: '100%',
            }}>
            </div>
            <div alt="menu">
              <Link href="/booking">
                <button
                  style={{
                    width: '160px',
                    height: '30px',
                    borderRadius: '8px',
                    marginTop: '10px',
                    marginBottom: '10px',
                    border: 'none',
                    backgroundColor: '#EAE4E9',
                    boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 1)'
                  }}
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
