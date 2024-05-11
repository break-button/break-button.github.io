import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TourGuideProvider } from 'rn-tourguide'
import { Main } from './src/components';
import { FeatureFlagProvider, ThemeProvider } from './src/contexts';
import { RecordByDateProvider } from './src/contexts';
import { stringMap } from './src/data';

export default function App() {
  return (
    <SafeAreaProvider>
      <FeatureFlagProvider>
        <RecordByDateProvider>
          <ThemeProvider>
            <TourGuideProvider 
              androidStatusBarVisible={true}
              labels={{
                'previous': stringMap['tour-steps.buttons.prev'],
                'next': stringMap['tour-steps.buttons.next'],
                'skip': stringMap['tour-steps.buttons.skip'],
                'finish': stringMap['tour-steps.buttons.finish'],
              }}
            >
              <Main/>
            </TourGuideProvider>
          </ThemeProvider>
        </RecordByDateProvider>
      </FeatureFlagProvider>
    </SafeAreaProvider>
  );
}
