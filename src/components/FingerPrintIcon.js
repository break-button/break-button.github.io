import { useContext } from 'react';
import { Image } from 'expo-image';
import LightFingerPrint from '../assets/icons/fingerprint.webp';
import DarkFingerPrint from '../assets/icons/fingerprint-dark_mode.webp';
import { ThemeContext } from '../contexts';

const ICON_SIZE = 56;

export default function FingerPrintIcon({ size: sizeProp }) {
    const size = sizeProp ?? ICON_SIZE;
    const style = { width: size, height: size };

    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Image
            style={style}
            source={isDarkMode ? DarkFingerPrint : LightFingerPrint}
            transition={0}
        />
    );
}