import { Main } from './src/components';
import { ThemeProvider } from './src/contexts';

export default function App() {
  return (
    <ThemeProvider>
      <Main/>
    </ThemeProvider>
  );
}
