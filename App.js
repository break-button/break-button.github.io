import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TourGuideProvider } from 'rn-tourguide'
import { Main } from './src/components';
import { FeatureFlagProvider, ThemeProvider } from './src/contexts';
import { RecordByDateProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
      <FeatureFlagProvider>
        <RecordByDateProvider>
          <ThemeProvider>
            <TourGuideProvider androidStatusBarVisible={true}>
              <Main/>
            </TourGuideProvider>
          </ThemeProvider>
        </RecordByDateProvider>
      </FeatureFlagProvider>
    </SafeAreaProvider>
  );
}
