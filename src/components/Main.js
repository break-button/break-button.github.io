import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ThemeContext, RecordByDateContext } from '../contexts';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';
import Spacer from './Spacer';
import Header from './Header';
import ButtonWithReaction from './ButtonWithReaction';
import FingerPrintIcon from './FingerPrintIcon';
import ResetIcon from './ResetIcon';
import ConfettiLottie from './ConfettiLottie';
import FireLottie from './FireLottie';

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

  useEffect(() => {
      if (isFingerPrintActive && remainingSeconds % 60 === 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
  }, [remainingSeconds, isFingerPrintActive]);

  const { isDarkMode, theme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'}/>

      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ConfettiLottie active={isFinished}/>

        <Header />

        <FireLottie active={isFingerPrintActive} />

        <Spacer spacing={2} />
        
        <Text style={[styles.timerText, { color: theme.color }]}>{displayTime(remainingSeconds)}</Text>

        <Spacer spacing={15}/>

        <ButtonWithReaction 
          onPressOut={reset}
          disabled={INITIAL_REMAINING_SECONDS <= remainingSeconds}
        >
          <ResetIcon />
        </ButtonWithReaction>

        <Spacer spacing={15}/>

        <ButtonWithReaction
          onPressIn={() => setIsFingerPrintActive(true)}
          onPressOut={() => setIsFingerPrintActive(false)}
          disabled={isFinished}
        >
          <FingerPrintIcon />
        </ButtonWithReaction>
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
