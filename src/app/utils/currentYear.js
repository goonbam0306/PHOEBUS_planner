import dayjs from 'dayjs';

export function currentYear() {
    const now = dayjs();

    const year = now.year();

    return year;
}