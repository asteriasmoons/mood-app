import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function HomeScreen() {
  const [note, setNote] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = ['😊', '😐', '😢', '😠', '🤩'];

  const handleCheckIn = () => {
  Alert.alert("Check-In Saved", "Your mood has been logged 🎉");
  // You can still save data here later
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* 🔝 Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>MoodMate</Text>
        <View>
          <Text>{new Date().toLocaleDateString()}</Text>
          <Text>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
      </View>

      {/* 🌤️ Mood Check-In */}
      <Text style={styles.sectionTitle}>How are you feeling right now?</Text>

      <View style={styles.moodRow}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
          >
            <Text style={styles.mood}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Activities: (coming soon)</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        value={note}
        onChangeText={setNote}
      />

      <Button title="✨ Check In" onPress={handleCheckIn} />

      {showPopup && (
        <Text style={styles.popup}>Check-in saved 🎉</Text>
      )}

      {/* 📈 Mood Trends Preview */}
      <Text style={styles.sectionTitle}>Your Mood Trends Preview</Text>
      <Text style={styles.subtext}>Longest Streak: 5 days 🌟 (coming soon)</Text>

      {/* 🧰 Quick Toolbox */}
      <Text style={styles.sectionTitle}>Need a quick reset?</Text>
      <Text style={styles.subtext}>[Toolbox shortcuts coming soon]</Text>

      {/* 🔔 Reminders */}
      <Text style={styles.sectionTitle}>Reminders</Text>
      <Text style={styles.subtext}>Next check-in: later today (coming soon)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
  },
  moodRow: {
    flexDirection: 'row',
    marginVertical: 12,
    gap: 10,
  },
  moodButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  selectedMood: {
    backgroundColor: '#d0bfff',
  },
  mood: {
    fontSize: 24,
  },
  label: {
    marginBottom: 4,
    color: '#888',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  popup: {
    marginTop: 10,
    color: 'green',
    fontWeight: '600',
  },
  subtext: {
    color: '#666',
    marginTop: 4,
  },
});