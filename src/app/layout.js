import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import 'react-datepicker/dist/react-datepicker.css';

export const metadata = {
  title: 'PHOEBUS planner',
  description: '피버스 연습실 예약 프로그램',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
