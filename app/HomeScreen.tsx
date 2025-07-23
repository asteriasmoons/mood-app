import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import { useJournal } from '../context/JournalContext';

export default function HomeScreen() {
  // Track light/dark/system theme
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const isDarkMode =
    theme === 'system'
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  // State for mood and note
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const { addEntry } = useJournal();

  const moods = ['😊', '😐', '😢', '😠', '🤩'];

  const handleCheckIn = () => {
  if (!selectedMood && !note.trim()) {
    Alert.alert("No entry", "Please select a mood or enter a note.");
    return;
  }
  addEntry({
    mood: selectedMood,
    note,
    timestamp: new Date().toISOString(),
  });
  setNote('');
  setSelectedMood(null);
  Alert.alert("Check-In Saved", "Your mood has been logged 🎉");
};

  // Dynamic styles
  const themedCard = [
    styles.card,
    { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }
  ];

  const themedContainer = [
    styles.container,
    { backgroundColor: isDarkMode ? '#121212' : '#fff' }
  ];

  return (
    <ScrollView
      style={themedContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={themedCard}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={[styles.appName, { color: isDarkMode ? '#fff' : '#222' }]}>MoodMate</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: isDarkMode ? '#bbb' : '#444' }}>
              {new Date().toLocaleDateString()}
            </Text>
            <Text style={{ color: isDarkMode ? '#bbb' : '#444' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            {/* Theme Toggle */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <TouchableOpacity onPress={() => setTheme('light')}>
                <Text style={{ fontSize: 18, opacity: theme === 'light' ? 1 : 0.5 }}>☀️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTheme('dark')}>
                <Text style={{ fontSize: 18, opacity: theme === 'dark' ? 1 : 0.5 }}>🌙</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTheme('system')}>
                <Text style={{ fontSize: 18, opacity: theme === 'system' ? 1 : 0.5 }}>🖥️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Mood Check-In */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#222' }]}>
          How are you feeling right now?
        </Text>

        <View style={styles.moodRow}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMood(mood)}
              style={[
                styles.moodButton,
                selectedMood === mood && { backgroundColor: '#d0bfff' },
              ]}
            >
              <Text style={styles.mood}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Activities: (coming soon)</Text>

        <TextInput
          style={[
            styles.input,
            {
              color: isDarkMode ? '#fff' : '#222',
              backgroundColor: isDarkMode ? '#232323' : '#f7f7f7',
              borderColor: isDarkMode ? '#444' : '#ccc',
            }
          ]}
          placeholder="Add a note..."
          placeholderTextColor={isDarkMode ? "#888" : "#888"}
          value={note}
          onChangeText={setNote}
        />

        <Button title="✨ Check In" onPress={handleCheckIn} color="#228be6" />

        {/* Mood Trends */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#222' }]}>
          Your Mood Trends Preview
        </Text>
        <Text style={[styles.subtext, { color: isDarkMode ? '#bbb' : '#666' }]}>
          Longest Streak: 5 days 🌟 (coming soon)
        </Text>

        {/* Toolbox */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#222' }]}>
          Need a quick reset?
        </Text>
        <Text style={[styles.subtext, { color: isDarkMode ? '#bbb' : '#666' }]}>
          [Toolbox shortcuts coming soon]
        </Text>

        {/* Reminders */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#222' }]}>
          Reminders
        </Text>
        <Text style={[styles.subtext, { color: isDarkMode ? '#bbb' : '#666' }]}>
          Next check-in: later today (coming soon)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 30,
    marginBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 28,
    fontSize: 18,
    fontWeight: '600',
  },
  moodRow: {
    flexDirection: 'row',
    marginVertical: 14,
    gap: 12,
    justifyContent: 'center',
  },
  moodButton: {
    padding: 11,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  mood: {
    fontSize: 28,
  },
  label: {
    marginBottom: 7,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    marginTop: 2,
  },
  subtext: {
    color: '#666',
    marginTop: 4,
  },
});