import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './src/components';
import { FeatureFlagProvider, ThemeProvider } from './src/contexts';
import { RecordByDateProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
      <FeatureFlagProvider>
        <RecordByDateProvider>
          <ThemeProvider>
            <Main/>
          </ThemeProvider>
        </RecordByDateProvider>
      </FeatureFlagProvider>
    </SafeAreaProvider>
  );
}
