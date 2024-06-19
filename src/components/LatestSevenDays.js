import React, { useState, useRef, useContext } from 'react';
import { Text } from 'react-native';
import { FONT_COLOR_MAP, FONT_SIZE_MAP, FONT_WEIGHT_MAP } from '../contants';
import { ThemeContext, RecordByDateContext } from '../contexts';
import Spacer from './Spacer';
import Row from './Row'
import Column from './Column';

const NUMBER_OF_DAYS = 7;

const useMaxWidth = (elementsCount) => {
    const layoutsRef = useRef(new Map());
    const [maxWidth, setMaxWidth] = useState();
    const measure = (event, key) => {
        const { nativeEvent: { layout } } = event;
        layoutsRef.current.set(key, layout.width);

        if (layoutsRef.current.size === elementsCount) {
            const maxWidth = Array.from(layoutsRef.current).reduce((acc, [,cur]) => {
                return acc >= cur ? acc : cur;
            }, 0);

            setMaxWidth(maxWidth);
        }
    };

    return [maxWidth, measure];
}

function Day({ label, count, today, onLayout, width }) {
    const { theme } = useContext(ThemeContext);
    const styles = {
        container: {
            width,
        },
        innerContainer: {
            alignItems: 'center',
            padding: 1.5,
            borderRadius: 2,
            backgroundColor: (count > 0) ? theme.accent : undefined,
            opacity: 0.3,
        },
        text: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.thin,
            color: FONT_COLOR_MAP.badge,
        },
        todayText: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.bold,
            color: theme.color,
        },
    };

    const textStyle = today ? styles.todayText : styles.text;

    return (
        <Column 
            style={styles.container}
            onLayout={onLayout}
        >
            <Column style={styles.innerContainer}>
                <Text style={textStyle}>{label}</Text>

                <Spacer spacing={1} />

                <Text style={textStyle}>{count}</Text>
            </Column>
        </Column>
    );
}

function LatestSevenDays() {
    const { getLatestRecords } = useContext(RecordByDateContext);
    const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            gap: 2.5,
            borderWidth: 1,
            borderColor: theme.color,
            borderRadius: 4,
            padding: 3,
        },
    };
    
    const [dayWidth, onDayLayout] = useMaxWidth(NUMBER_OF_DAYS);

    return (
        <Row style={styles.container}>
            {getLatestRecords(NUMBER_OF_DAYS).map((day) => (
                <Day
                    onLayout={(event) => onDayLayout(event, day.label)}
                    key={day.label}
                    width={dayWidth}
                    {...day}
                />
            ))}
        </Row>
    );
}

export default LatestSevenDays;
