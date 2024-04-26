import { useCallback, useEffect, useMemo, useState } from 'react';

const useTimer = ({ initialSeconds, active }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    const reset = useCallback(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (active) {
            const timeId = setInterval(() => {
                setSeconds((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timeId);
        }
    }, [active, initialSeconds]);

    return useMemo(() => [seconds, reset], [seconds, reset]);
};

export default useTimer;
