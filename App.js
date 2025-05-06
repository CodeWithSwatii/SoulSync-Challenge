// client/App.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://localhost:5000/chat', { message });
      setReply(res.data.reply);
    } catch (err) {
      setReply("Error: " + err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>AI Chat App</Text>
        <TextInput
          style={styles.input}
          placeholder="Ask something..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
        <Text style={styles.reply}>Reply: {reply}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  reply: { marginTop: 20, fontSize: 18 }
});
