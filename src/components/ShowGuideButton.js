import { useContext } from "react";
import { Image } from 'expo-image';
import { useTourGuideController } from "rn-tourguide";
import DarkModeIcon from '../assets/icons/question-dark_mode.webp';
import LightModeIcon from '../assets/icons/question.webp';
import { ThemeContext } from '../contexts';
import ButtonWithReaction from './ButtonWithReaction';

const ICON_SIZE = 22;

export default function ShowGuideButton() {
    const { isDarkMode } = useContext(ThemeContext);

    const { start } = useTourGuideController();

    return (
        <ButtonWithReaction 
            onPressOut={() => start()}
            radius={24}
        >
          <Image
            source={isDarkMode ? DarkModeIcon : LightModeIcon}
            transition={0}
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          /> 
        </ButtonWithReaction>
    )
}