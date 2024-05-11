import { useContext } from "react";
import { Image } from 'expo-image';
import DarkModeIcon from '../assets/icons/dark-mode.webp';
import LightModeIcon from '../assets/icons/light-mode.webp';
import { ThemeContext } from '../contexts';
import ButtonWithReaction from './ButtonWithReaction';

const MODE_ICON_SIZE = 24;

export default function ModeSwitchButton() {
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