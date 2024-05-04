import React, { createContext, useEffect, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getItem, setItem } from '../storage';
import { useToday } from '../hooks';

export const CountByDateContext = createContext();

const KEY = '@dopamine-detox/count-by-date';

export default function CountByDateProvider({ children }) {
    const today = useToday();
    const defaultValue = { [today]: [] };

    const [countByDate, setCountByDate] = useState(defaultValue);
    const updateCountByDate = useCallback(async (newCountByDate) => {
        await setItem(KEY, typeof newCountByDate);
        setCountByDate(newCountByDate);
    }, [countByDate]);

    useEffect(() => {
        const fetchCountByDate = async () => {
            const originalCountByDate = await getItem(KEY) || {};
            setCountByDate({ ...defaultValue, ...originalCountByDate });
        };

        fetchCountByDate();
    }, [today]);

    const increaseTodayCount = () => {
        const copiedCountByDate = { ...countByDate };
        const copiedTodayTries = [...copiedCountByDate[today]];

        const tryingTimeTag = Date.now();
        copiedTodayTries.push(tryingTimeTag);

        copiedCountByDate[today] = copiedTodayTries;

        updateCountByDate(copiedCountByDate);
    };

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

    const context = useMemo(() => ({ 
        increaseTodayCount, 
        getLatestWeek
     }), [countByDate]);

    return (
        <CountByDateContext.Provider value={context}>
            {children}
        </CountByDateContext.Provider>
    );
}
