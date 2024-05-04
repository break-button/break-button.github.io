import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../contexts/ThemeProvider';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';
import Spacer from './Spacer';
import Header from './Header';
import ButtonWithReaction from './ButtonWithReaction';
import FingerPrintIcon from './FingerPrintIcon';
import ResetIcon from './ResetIcon';

export default function Main() {
  const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
  const [remainingSeconds, reset] = useTimer({
      initialSeconds: INITIAL_REMAINING_SECONDS,
      active: isFingerPrintActive,
  });

  const { isDarkMode, theme } = useContext(ThemeContext);
  
  return (
    <React.Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'}/>

      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Header />

        <Text style={[styles.timerText, { color: theme.color }]}>{displayTime(remainingSeconds)}</Text>

        <Spacer spacing={20}/>

        <ButtonWithReaction onPressOut={reset}>
          <ResetIcon />
        </ButtonWithReaction>

        <Spacer spacing={20}/>

        <ButtonWithReaction
          onPressIn={() => setIsFingerPrintActive(true)}
          onPressOut={() => setIsFingerPrintActive(false)}
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
    fontSize: 60,
  },
});
