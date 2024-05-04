import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './src/components';
import { ThemeProvider } from './src/contexts';
import { CountByDateProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
        <CountByDateProvider>
          <ThemeProvider>
            <Main/>
          </ThemeProvider>
        </CountByDateProvider>
    </SafeAreaProvider>
  );
}
