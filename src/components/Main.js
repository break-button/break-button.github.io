import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../contexts/ThemeProvider';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';
import Spacer from './Spacer';
import Header from './Header';

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

        <Text style={[styles.timerText, { ...theme }]}>{displayTime(remainingSeconds)}</Text>

        <Spacer spacing={20}/>

        <TouchableOpacity
          onPress={reset}
          style={{ padding: 20, backgroundColor: 'red' }}
        >
          <Text style={{ color: theme.color }}>Reset</Text>
        </TouchableOpacity>

        <Spacer spacing={20}/>

        <TouchableOpacity
          onPressIn={() => setIsFingerPrintActive(true)}
          onPressOut={() => setIsFingerPrintActive(false)}
          style={{ padding: 20, backgroundColor: 'red' }}
        >
          <Text style={{ color: theme.color }}>Go</Text>
        </TouchableOpacity>
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
