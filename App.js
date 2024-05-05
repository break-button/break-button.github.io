import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './src/components';
import { ThemeProvider } from './src/contexts';
import { RecordByDateProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
        <RecordByDateProvider>
          <ThemeProvider>
            <Main/>
          </ThemeProvider>
        </RecordByDateProvider>
    </SafeAreaProvider>
  );
}
