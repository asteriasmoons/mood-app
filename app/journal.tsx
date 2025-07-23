import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useJournal } from '../context/JournalContext';

export default function JournalPage() {
  const { entries } = useJournal();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Journal</Text>
      {entries.length === 0 ? (
        <Text style={styles.empty}>No entries yet.</Text>
      ) : (
        entries.map((entry, idx) => (
          <View style={styles.entry} key={idx}>
            <Text style={styles.mood}>{entry.mood ? entry.mood : "📝"}</Text>
            <Text style={styles.note}>{entry.note}</Text>
            <Text style={styles.timestamp}>{new Date(entry.timestamp).toLocaleString()}</Text>
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
  },
  empty: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 32,
  },
  entry: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#f7f7f7',
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
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});