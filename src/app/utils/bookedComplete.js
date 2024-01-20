import Swal from 'sweetalert2';

export function bookedComplete() {
    Swal.fire({
        icon:"success",
        text: "예약이 완료되었습니다!",
        footer: '<a href="/">홈으로 돌아가기</a>'
    });
}