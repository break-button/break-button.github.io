import React, { createContext, useEffect, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getItem, setItem } from '../storage';

export const CountByDateContext = createContext();

const KEY = '@dopamine-detox/count-by-date';

const today = dayjs(Date.now()).format('YYYY-MM-DD');
const defaultValue = { [today]: [] };

export default function CountByDateProvider({ children }) {
    const [countByDate, setCountByDate] = useState(defaultValue);

    useEffect(() => {
        const fetchCountByDate = async () => {
            const originalCountByDate = await getItem(KEY) || defaultValue;
            setCountByDate(originalCountByDate);
        }

        fetchCountByDate();
    }, []);

    const changeCountByDate = useCallback(
        async (dataOrFunc) => {
            await setItem(
                KEY, 
                typeof dataOrFunc === 'function' ? dataOrFunc(countByDate) : dataOrFunc,
            );

            setCountByDate(dataOrFunc);
        },
        [countByDate],
    );

    const increaseTodayCount = () => {
        const copiedCountByDate = { ...countByDate };
        const copiedTodayCounts = [...copiedCountByDate[today]];

        copiedTodayCounts.push(Date.now());

        copiedCountByDate[today] = copiedTodayCounts;

        changeCountByDate(copiedCountByDate);
    };

    const todayCount = countByDate[today]?.length || 0;

    const getLatestWeek = () => {
        return Array(7)
            .fill(0)
            .map((_, index) => dayjs().subtract(7 - (index + 1), 'day'))
            .map((day, index) => {
                const date = day.format('YYYY-MM-DD');
                const count = countByDate[date]?.length || 0;
                return { label: day.format('ddd'), count, today: index + 1 === 7 };
            })
    };

    const context = useMemo(
        () => ({
            countByDate,
            todayCount,
            increaseTodayCount,
            getLatestWeek,
        }),
        [countByDate],
    );

    return (
        <CountByDateContext.Provider value={context}>
            {children}
        </CountByDateContext.Provider>
    );
}
