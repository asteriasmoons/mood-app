import { Stack } from 'expo-router';
import { JournalProvider } from '../context/JournalContext';

export default function RootLayout() {
  return (
    <JournalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </JournalProvider>
  );
}