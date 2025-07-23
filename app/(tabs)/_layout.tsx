import { Tabs } from 'expo-router';
import { JournalProvider } from '../../context/JournalContext';

export default function RootLayout() {
  return (
    <JournalProvider>
      <Tabs />
    </JournalProvider>
  );
}