import React, { createContext, useEffect, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getItem, setItem } from '../storage';
import { useToday } from '../hooks';

export const RecordByDateContext = createContext();

const KEY = '@dopamine-detox/record-by-date';

export default function RecordByDateProvider({ children }) {
    const today = useToday();
    const defaultValue = { [today]: [] };

    const [recordByDate, setRecordByDate] = useState(defaultValue);
    const updateRecordByDate = useCallback(async (newRecordByDate) => {
        await setItem(KEY, newRecordByDate);
        setRecordByDate(newRecordByDate);
    }, [recordByDate]);

    useEffect(() => {
        const fetchRecordByDate = async () => {
            const originalRecordByDate = await getItem(KEY) || {};
            setRecordByDate({ ...defaultValue, ...originalRecordByDate });
        };

        fetchRecordByDate();
    }, [today]);

    const addRecord = ({ seconds }) => {
        const copiedRecordByDate = { ...recordByDate };
        const copiedTodayRecord = [...copiedRecordByDate[today]];

        const record = {
            createdAt: Date.now(),
            seconds,
        };
        copiedTodayRecord.push(record);

        copiedRecordByDate[today] = copiedTodayRecord;

        updateRecordByDate(copiedRecordByDate);
    };

    const getLatestRecords = (days) => {
        return Array(days)
            .fill(0)
            .map((_, index) => dayjs().subtract(days - (index + 1), 'day'))
            .map((day, index) => {
                const date = day.format('YYYY-MM-DD');
                const count = recordByDate[date]?.length || 0;
                return { label: day.format('ddd'), count, today: index + 1 === days };
            })
    };

    const context = useMemo(() => ({ 
        addRecord, 
        getLatestRecords
     }), [recordByDate]);

    return (
        <RecordByDateContext.Provider value={context}>
            {children}
        </RecordByDateContext.Provider>
    );
}
