import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export default function useHapticFeedback(shouldWork) {
    useEffect(() => {
        if (shouldWork) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }, [shouldWork]);
}