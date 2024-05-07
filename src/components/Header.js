import { useContext } from "react";
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DarkModeIcon from '../assets/icons/dark-mode.webp';
import LightModeIcon from '../assets/icons/light-mode.webp';
import { FeatureFlagContext, ThemeContext } from '../contexts';
import Row from './Row';
import ButtonWithReaction from './ButtonWithReaction';
import LatestSevenDays from './LatestSevenDays';
import Column from "./Column";

const MODE_ICON_SIZE = 24;

function ModeSwitchButton() {
    const { isDarkMode, toggleIsDarkMode } = useContext(ThemeContext);

    return (
        <ButtonWithReaction
            onPressOut={toggleIsDarkMode}
            radius={24}
        >
          <Image
            source={isDarkMode ? DarkModeIcon : LightModeIcon}
            transition={0}
            style={{ width: MODE_ICON_SIZE, height: MODE_ICON_SIZE }}
          /> 
        </ButtonWithReaction>
    )
}

export default function Header() {
    const insets = useSafeAreaInsets();

    const styles = {
        container: {
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: insets.top,
            padding: 24,
            alignItems: 'center',
        }
    };

    const { enableDarkMode, showLatestRecords } = useContext(FeatureFlagContext);

    return (
        <Row style={styles.container}>
            {showLatestRecords && <LatestSevenDays/>}

            {enableDarkMode && (
                <Column style={{ marginLeft: 'auto' }}>
                    <ModeSwitchButton/>
                </Column>
            )}
        </Row>
    )
}