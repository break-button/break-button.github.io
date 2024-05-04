import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ONE_SECOND = 1000;
const getToday = () => dayjs(Date.now()).format('YYYY-MM-DD');

const useToday = () => {
    const [today, setToday] = useState(getToday);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (today !== getToday()) {
                setToday(getToday());
            }
        }, ONE_SECOND)

        return () => {
            clearInterval(intervalId);
        }
    }, [today]);

    return today;
}

export default useToday;