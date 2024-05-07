import { createContext, useMemo } from 'react';

export const FeatureFlagContext = createContext();

export default function FeatureFlagProvider({ children }) {
    const context = useMemo(() => ({
        enableDarkMode: false,
        showLatestRecords: false,
        enableHapticFeedback: false,
        skipAds: false,
        showFireLottie: false,
        showConfettiLottie: false,
    }), []);

    return (
        <FeatureFlagContext.Provider value={context}>
            {children}
        </FeatureFlagContext.Provider>
    )
}