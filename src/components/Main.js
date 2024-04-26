import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTimer } from '../hooks';
import { displayTime } from '../utils';
import { INITIAL_REMAINING_SECONDS } from '../contants';

export default function Main() {
  const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
  const [remainingSeconds, reset] = useTimer({
      initialSeconds: INITIAL_REMAINING_SECONDS,
      active: isFingerPrintActive,
  });
  
  return (
    <View style={styles.container}>
      <Text>{displayTime(remainingSeconds)}</Text>

      <View style={{ paddingVertical: 20 }}/>

      <TouchableOpacity
        onPress={reset}
        style={{ padding: 20, backgroundColor: 'red' }}
      >
        <Text>Reset</Text>
      </TouchableOpacity>

      <View style={{ paddingVertical: 20 }}/>

      <TouchableOpacity
        onPressIn={() => setIsFingerPrintActive(true)}
        onPressOut={() => setIsFingerPrintActive(false)}
        style={{ padding: 20, backgroundColor: 'red' }}
      >
        <Text>Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
