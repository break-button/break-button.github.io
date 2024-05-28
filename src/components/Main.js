import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext, RecordByDateContext, FeatureFlagContext } from '../contexts';
import { useTimer, useTourGuide, useHapticFeedback } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';
import Spacer from './Spacer';
import Header from './Header';
import ButtonWithReaction from './ButtonWithReaction';
import FingerPrintIcon from './FingerPrintIcon';
import ResetIcon from './ResetIcon';
import ConfettiLottie from './ConfettiLottie';
import FireLottie from './FireLottie';
import TourStep from './TourStep';

export default function Main() {
  const { addRecord } = useContext(RecordByDateContext);

  const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
  const [remainingSeconds, reset] = useTimer({
      initialSeconds: INITIAL_REMAINING_SECONDS,
      active: isFingerPrintActive,
  });
  const isFinished = remainingSeconds <= 0;
  useEffect(() => {
    if (isFinished) {
        setIsFingerPrintActive(false);

        addRecord({ seconds: INITIAL_REMAINING_SECONDS });
    }
}, [isFinished]);

  const { showConfettiLottie, showFireLottie, enableHapticFeedback } = useContext(FeatureFlagContext);

  useHapticFeedback(enableHapticFeedback && isFingerPrintActive && remainingSeconds % 60 === 0);

  const { isDarkMode, theme } = useContext(ThemeContext);

  useTourGuide();

  return (
    <React.Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'}/>

      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {showConfettiLottie && <ConfettiLottie active={isFinished}/>}

        <Header />

        {showFireLottie && (
          <React.Fragment>
            <TourStep stepKey={'FIRE_LOTTIE'}>
              <FireLottie active={isFingerPrintActive} />
            </TourStep>

            <Spacer spacing={2} />
          </React.Fragment>
        )}
        
        <TourStep stepKey={'TIMER'}>
          <Text style={[styles.timerText, { color: theme.color }]}>{displayTime(remainingSeconds)}</Text>
        </TourStep>

        <Spacer spacing={15}/>

        <TourStep stepKey={'RESET'}>
          <ButtonWithReaction 
            onPressOut={reset}
            disabled={INITIAL_REMAINING_SECONDS <= remainingSeconds}
          >
            <ResetIcon />
          </ButtonWithReaction>
        </TourStep>

        <Spacer spacing={15}/>

        <TourStep stepKey={'FINGER_PRINT'}>
          <ButtonWithReaction
            onPressIn={() => setIsFingerPrintActive(true)}
            onPressOut={() => setIsFingerPrintActive(false)}
            disabled={isFinished}
          >
            <FingerPrintIcon />
          </ButtonWithReaction>
        </TourStep>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerText: {
    fontSize: 30,
  },
});
