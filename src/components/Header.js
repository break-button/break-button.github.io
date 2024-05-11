import { useContext } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeatureFlagContext } from '../contexts';
import Row from './Row';
import LatestSevenDays from './LatestSevenDays';
import Column from "./Column";
import TourStep from './TourStep';
import ModeSwitchButton from './ModeSwitchButton';

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
            {showLatestRecords && (
                <TourStep stepKey={'LATEST_RECORDS'}>
                    <LatestSevenDays/>
                </TourStep>
            )}

            {enableDarkMode && (
                <Column style={{ marginLeft: 'auto' }}>
                    <TourStep stepKey={'MODE_SWITCH'}>
                        <ModeSwitchButton/>
                    </TourStep>
                </Column>
            )}
        </Row>
    )
}