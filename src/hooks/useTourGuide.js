import { useEffect, useState } from 'react';
import { useTourGuideController } from 'rn-tourguide';
import { getItem, setItem } from '../storage';

const KEY = '@dopamine-detox/ever-show-guide';

export default function useTourGuide() {
    const { canStart, start } = useTourGuideController();

    const [everShowGuide, setEverShowGuide] = useState();
    useEffect(() => {
        const loadEverShowGuide = async () => {
            setEverShowGuide(Boolean(await getItem(KEY)));
            setItem(KEY, true);
        };

        loadEverShowGuide();
    }, []);

    useEffect(() => {
        if (canStart && (everShowGuide === false)) {
            setTimeout(() => { start() }, 100);
        }
    }, [canStart, everShowGuide]);
}