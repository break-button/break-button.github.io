import { useContext, useEffect, useRef } from 'react';
import { Div } from '@expo/html-elements';
import { Image } from 'expo-image';
import LightFingerPrint from '../../assets/icons/fingerprint.webp';
import DarkFingerPrint from '../../assets/icons/fingerprint-dark_mode.webp';
import { ThemeContext } from '../../contexts';

const ICON_SIZE = 56;

export default function FingerPrintIcon({ size: sizeProp }) {
    const { isDarkMode } = useContext(ThemeContext);
    
    const size = sizeProp ?? ICON_SIZE;
    const styles = {
        container: { 
            alignItems: 'center',
            justifyContent: 'center',
            pointEvents: 'box-only',
            touchAction: 'none',
        },
        image: {
            width: size,
            height: size,
        },
    };

    const elementRef = useRef(null);
    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            element.style.userSelect = 'none';
            element.style.webkitUserDrag = 'none';

            const preventDefault = (event) => event.preventDefault();
          
            element.addEventListener('contextmenu', preventDefault);
            element.addEventListener('touchstart', preventDefault, { passive: false });
            element.addEventListener('touchend', preventDefault, { passive: false });
            element.addEventListener('touchmove', preventDefault, { passive: false });
            element.addEventListener('touchcancel', preventDefault, { passive: false });
          
            return () => {
                element.removeEventListener('contextmenu', preventDefault);
                element.removeEventListener('touchstart', preventDefault);
                element.removeEventListener('touchend', preventDefault);
                element.removeEventListener('touchmove', preventDefault);
                element.removeEventListener('touchcancel', preventDefault);
            };
        }
    }, []);

    return (
        <Div 
            style={styles.container}
            ref={elementRef}
        >
            <Image
                draggable={false}
                style={styles.image}
                source={isDarkMode ? DarkFingerPrint : LightFingerPrint}
                transition={0}
            />
        </Div>
    )
}