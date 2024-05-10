import React, { useContext } from 'react';
import { Text } from 'react-native';
import { FONT_COLOR_MAP, FONT_SIZE_MAP, FONT_WEIGHT_MAP } from '../contants';
import { ThemeContext, RecordByDateContext } from '../contexts';
import Spacer from './Spacer';
import Row from './Row'
import Column from './Column';

function Day({ label, count, today }) {
    const { theme } = useContext(ThemeContext);
    const styles = {
        container: {
            position: 'relative',
            alignItems: 'center',
        },
        indicator: {
            position: 'absolute',
            top: -2,
            bottom: -2,
            left: -2,
            right: -2,
            borderRadius: 2,
            backgroundColor: theme.accent,
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
        <Column style={styles.container}>
            {(count > 0) && <Column style={styles.indicator} />}

            <Text style={textStyle}>{label}</Text>

            <Spacer spacing={1} />

            <Text style={textStyle}>{count}</Text>
        </Column>
    );
}

function LatestSevenDays() {
    const { getLatestRecords } = useContext(RecordByDateContext);
    const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            gap: 8,
            borderWidth: 1,
            borderColor: theme.color,
            borderRadius: 4,
            padding: 4,
        },
    };

    return (
        <Row style={styles.container}>
            {getLatestRecords(7).map((day) => (
                <Day
                    key={day.label}
                    {...day}
                />
            ))}
        </Row>
    );
}

export default LatestSevenDays;
