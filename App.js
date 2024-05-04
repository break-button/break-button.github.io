import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './src/components';
import { ThemeProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Main/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
