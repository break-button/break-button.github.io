import { createContext, useMemo } from 'react';

export const FeatureFlagContext = createContext();

export default function FeatureFlagProvider({ children }) {
    const context = useMemo(() => ({
        enableDarkMode: true,
        showLatestRecords: true,
        enableHapticFeedback: true,
        skipAds: false,
        showFireLottie: true,
        showConfettiLottie: true,
    }), []);

    return (
        <FeatureFlagContext.Provider value={context}>
            {children}
        </FeatureFlagContext.Provider>
    )
}