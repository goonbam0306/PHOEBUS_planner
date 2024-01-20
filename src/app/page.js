import Image from 'next/image'
import Link from 'next/link'
import TodayBooked from './components/todayBooked';

export default function Home() {
  return (
    <div>
      <div alt="main page">
        <div alt="header [추후에 이미지와 텍스트 동일 선상에 두는 css 필요]">
          <div>
            <Image src="/phoebus_logo.png" width={100} height={100} alt="피버스 로고" />
          </div>
          <div>
            Phoebus<br />
            planner
          </div>
        </div>
        <div alt="menu">
          <Link href="/booking">
            <button>
              예약하러 가기
            </button>
          </Link>
          <Link href="/booked-confirm">
            <button>
              예약현황 확인
            </button>
          </Link>
        </div>
        <div alt="today's use">
          <div>
            오늘의 예약
          </div>
          <div>
            {/*<TodayBooked />*/}
          </div>
        </div>
      </div>
    </div>
  )
}
