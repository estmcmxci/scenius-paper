import { Header } from './components/Header';
import { SplitLayout } from './components/SplitLayout';
import { PaperReaderProvider } from './context/PaperReaderContext';

export default function App() {
  return (
    <PaperReaderProvider>
      <div className="app-shell">
        <Header />
        <SplitLayout />
      </div>
    </PaperReaderProvider>
  );
}
