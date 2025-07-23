import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#fff',
          borderTopColor: isDarkMode ? '#232323' : '#eee',
        },
        tabBarActiveTintColor: isDarkMode ? '#7d66ffff' : '#7d66ffff',
        tabBarInactiveTintColor: isDarkMode ? '#bbb' : '#888',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
        }}
      />
    </Tabs>
  );
}