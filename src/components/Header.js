import React, { useContext } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeatureFlagContext } from '../contexts';
import Row from './Row';
import LatestSevenDays from './LatestSevenDays';
import TourStep from './TourStep';
import ModeSwitchButton from './ModeSwitchButton';
import ShowGuideButton from './ShowGuideButton';
import Spacer from "./Spacer";

const isWeb = Platform.OS === 'web';

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
        },
        buttons: {
            marginLeft: 'auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
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
                <Row style={styles.buttons}>
                    {!isWeb ? (
                        <React.Fragment>
                            <TourStep stepKey={'SHOW_GUIDE'}>
                                <ShowGuideButton/>
                            </TourStep>

                            <Spacer spacing={4}/>
                        </React.Fragment>
                    ) : null}

                    <TourStep stepKey={'MODE_SWITCH'}>
                        <ModeSwitchButton/>
                    </TourStep>
                </Row>
            )}
        </Row>
    )
}