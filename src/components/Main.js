import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../contexts/ThemeProvider';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';
import DarkModeIcon from '../assets/icons/dark-mode.webp';
import LightModeIcon from '../assets/icons/light-mode.webp';

export default function Main() {
  const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
  const [remainingSeconds, reset] = useTimer({
      initialSeconds: INITIAL_REMAINING_SECONDS,
      active: isFingerPrintActive,
  });

  const { isDarkMode, toggleIsDarkMode, theme } = useContext(ThemeContext);
  
  return (
    <React.Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'}/>

      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

        <TouchableOpacity onPress={toggleIsDarkMode}>
          <Image
            source={isDarkMode ? DarkModeIcon : LightModeIcon}
            transition={0}
            style={{ width: 36, height: 36 }}
          /> 
        </TouchableOpacity>

        <Text style={{ color: theme.color }}>{displayTime(remainingSeconds)}</Text>

        <View style={{ paddingVertical: 20 }}/>

        <TouchableOpacity
          onPress={reset}
          style={{ padding: 20, backgroundColor: 'red' }}
        >
          <Text style={{ color: theme.color }}>Reset</Text>
        </TouchableOpacity>

        <View style={{ paddingVertical: 20 }}/>

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
  },
});
