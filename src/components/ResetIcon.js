import { useContext } from 'react';
import { Image } from 'expo-image';
import LightReset from '../assets/icons/reset.webp';
import DarkReset from '../assets/icons/reset-dark_mode.webp';
import { ThemeContext } from '../contexts';

const ICON_SIZE = 48;

export default function RewindIcon({ size: sizeProp }) {
    const size = sizeProp ?? ICON_SIZE;
    const style = { width: size, height: size };

    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Image
            style={style}
            source={isDarkMode ? DarkReset : LightReset}
            transition={0}
        />
    );
}