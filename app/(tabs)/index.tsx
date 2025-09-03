import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { JSX, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { auth, db } from "@/lib/firebase";

type Entry = { id: string; text: string };

export default function Index(): JSX.Element {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        loadEntries(u.uid);
      } else {
        setEntries([]);
      }
    });
    return unsub;
  }, []);

  const loadEntries = async (uid: string) => {
    try {
      const q = query(
        collection(db, "users", uid, "entries"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const list: Entry[] = snap.docs.map((d) => ({
        id: d.id,
        text: d.data().text,
      }));
      setEntries(list);
    } catch (err: any) {
      console.log("LOAD error", err.message);
    }
  };

  const addEntry = async () => {
    if (!user) return;
    const text = entry.trim();
    if (!text) return;
    try {
      await addDoc(collection(db, "users", user.uid, "entries"), {
        text,
        createdAt: new Date(),
      });
      setEntry("");
      loadEntries(user.uid);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      Alert.alert("Signed up", "Account created");
    } catch (err: any) {
      Alert.alert("Sign up failed", err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      Alert.alert("Signed in", "Welcome back");
    } catch (err: any) {
      Alert.alert("Sign in failed", err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      Alert.alert("Sign out failed", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {!user ? (
          <>
            <Text style={styles.title}>Firebase Auth</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={pw}
              onChangeText={setPw}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Sign In" onPress={handleSignIn} />
          </>
        ) : (
          <>
            <Text style={styles.title}>Welcome, {user.email}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />

            <TextInput
              style={styles.input}
              placeholder="Write something..."
              value={entry}
              onChangeText={setEntry}
              multiline
            />
            <Button title="Add Entry" onPress={addEntry} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <FlatList
                style={styles.list}
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Text style={styles.entry}>{item.text}</Text>
                )}
                ListEmptyComponent={
                  <Text style={{ color: "#666" }}>No entries yet</Text>
                }
                keyboardShouldPersistTaps="handled"
              />
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 100 },
  title: { fontSize: 22, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  list: { marginTop: 10 },
  entry: {
    paddingVertical: 10,
    borderBottomWidth: 5,
    fontSize: 15,
  },
});
