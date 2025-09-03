import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

type Entry = { id: string; text: string };

const STORAGE_KEY = "JOURNAL_ENTRIES_V1";

export default function Index() {
  const [entry, setEntry] = useState<string>("");
  const [entries, setEntries] = useState<Entry[]>([]);

  // load saved entries
  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEntries(JSON.parse(raw));
      } catch {
        Alert.alert("Error", "Could not load past entries.");
      }
    };
    load();
  }, []);

  // save
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch {
        Alert.alert("Error", "Could not save entries.");
      }
    };
    save();
  }, [entries]);

  const addEntry = () => {
    const text = entry.trim();
    if (!text) return;
    setEntries((prev) => [{ id: Date.now().toString(), text }, ...prev]);
    setEntry("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journal</Text>

      <TextInput
        style={styles.input}
        placeholder="Write something..."
        value={entry}
        onChangeText={setEntry}
        multiline
      />

      <Button title="Add Entry" onPress={addEntry} />

      <FlatList
        style={styles.list}
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.entry}>{item.text}</Text>}
        ListEmptyComponent={<Text style={{ color: "#666" }}>No entries yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    minHeight: 80,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  list: { marginTop: 8 },
  entry: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    fontSize: 16,
    lineHeight: 22,
  },
});
