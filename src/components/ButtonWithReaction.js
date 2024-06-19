import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts';
import Column from './Column';

const DEFAULT_RADIUS = 52;
const TOUCH_AREA = 12;

export default function ButtonWithReaction({
    children,
    radius,
    disabled,
    onPressIn,
    onPressOut,
    style: styleProps,
    ...otherProps
}) {
    const { theme } = useContext(ThemeContext);

    const [isActive, setIsActive] = useState();
    const handleIsActive = (dataOrFunc) => {
        if (!disabled) {
            setIsActive(dataOrFunc);
        } else {
            setIsActive(false);
        }
    };
    useEffect(() => {
        if (disabled) {
            setIsActive(false);
        }
    }, [disabled]);

    const overlayRadius = radius ?? DEFAULT_RADIUS;

    const styles = {
        touchAreaOverLay: {
            position: 'absolute',
            width: overlayRadius * 2,
            height: overlayRadius * 2,
            backgroundColor: theme.accent,
            opacity: 0.3,
            borderRadius: overlayRadius * 2,
            pointerEvents: 'none',
        },
    };

    const wrapEventHandler = (eventHandler) => (e) => {
        if (typeof eventHandler === 'function' && !disabled) {
            eventHandler(e);
        }
    };

    const handlePressIn = (e) => {
        handleIsActive(true);

        wrapEventHandler(onPressIn)(e);
    };

    const handlePressOut = (e) => {
        handleIsActive(false);

        wrapEventHandler(onPressOut)(e);
    };

    const style = [
        styleProps,
        { 
            opacity: disabled ? 0.1 : 1,
            margin: -TOUCH_AREA,
            padding: TOUCH_AREA,
        },
    ];

    return (
        <Column style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                {...otherProps}
                disabled={disabled}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={style}
            >
                {children}
            </TouchableOpacity>

            {isActive && <Column style={styles.touchAreaOverLay} />}
        </Column>
    );
}
