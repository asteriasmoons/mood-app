import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useJournal } from '../../context/JournalContext';

export default function JournalPage() {
  const { entries } = useJournal();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#fff',
      }}
      contentContainerStyle={styles.container}
    >
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#fff' : '#222' }
      ]}>
        Your Journal
      </Text>
      {entries.length === 0 ? (
        <Text style={[
          styles.empty,
          { color: isDarkMode ? '#888' : '#aaa' }
        ]}>
          No entries yet.
        </Text>
      ) : (
        entries.map((entry, idx) => (
          <View
            style={[
              styles.entry,
              { backgroundColor: isDarkMode ? '#232323' : '#f7f7f7' }
            ]}
            key={idx}
          >
            <Text style={styles.mood}>{entry.mood ? entry.mood : "📝"}</Text>
            <Text style={[
              styles.note,
              { color: isDarkMode ? '#eee' : '#222' }
            ]}>{entry.note}</Text>
            <Text style={[
              styles.timestamp,
              { color: isDarkMode ? '#bbb' : '#888' }
            ]}>
              {new Date(entry.timestamp).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222', // will be overridden if dark mode
  },
  empty: {
    fontSize: 16,
    color: '#aaa', // will be overridden if dark mode
    marginTop: 32,
  },
  entry: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#f7f7f7', // will be overridden if dark mode
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  mood: {
    fontSize: 20,
    marginBottom: 2,
  },
  note: {
    fontSize: 16,
    marginBottom: 6,
    color: '#222', // will be overridden if dark mode
  },
  timestamp: {
    fontSize: 12,
    color: '#888', // will be overridden if dark mode
    textAlign: 'right',
  },
});