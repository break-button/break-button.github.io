import React, { useContext } from 'react';
import { Text } from 'react-native';
import { FONT_SIZE_MAP, FONT_WEIGHT_MAP } from '../contants';
import { ThemeContext, CountByDateContext } from '../contexts';
import Spacer from './Spacer';
import Row from './Row'
import Column from './Column';

function Day({ label, count, today }) {
    const { theme } = useContext(ThemeContext);
    const styles = {
        container: {
            position: 'relative',
            alignItems: 'center',
            width: 24,
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
        label: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.badge,
            color: theme.color,
        },
        count: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.badge,
            color: theme.color,
        },
    };

    return (
        <Column style={styles.container}>
            {today && <Column style={styles.indicator} />}

            <Text style={styles.label}>{label}</Text>

            <Spacer spacing={1} />

            <Text style={styles.count}>{count}</Text>
        </Column>
    );
}

function LatestSevenDays() {
    const { getLatestWeek } = useContext(CountByDateContext);
    const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            gap: 6,
            borderWidth: 1,
            borderColor: theme.color,
            borderRadius: 4,
            padding: 4,
        },
    };

    return (
        <Row style={styles.container}>
            {getLatestWeek().map((day) => (
                <Day
                    key={day.label}
                    {...day}
                />
            ))}
        </Row>
    );
}

export default LatestSevenDays;
