import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../contexts/ThemeProvider';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';

export default function Main() {
  const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
  const [remainingSeconds, reset] = useTimer({
      initialSeconds: INITIAL_REMAINING_SECONDS,
      active: isFingerPrintActive,
  });

  const { isDarkMode, toggleIsDarkMode, theme } = useContext(ThemeContext);
  const lightOrDarkModeText = isDarkMode ? '다크모드 활성화 중' : '라이트 모드 활성화 중';
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Button
        title={lightOrDarkModeText}
        onPress={toggleIsDarkMode}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
