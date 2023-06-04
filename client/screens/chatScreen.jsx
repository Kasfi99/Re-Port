import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

<<<<<<< HEAD
  const handleInput = () => {
    onChangeText("");
  };

  console.log(text);
=======
  const handleSend = () => {
    console.log("Pesan yang dikirim:", message);
    setMessages([...messages, { id: messages.length, text: message }]);
    setMessage("");
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };
>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
<<<<<<< HEAD
    </View>
=======
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Ketik pesan Anda..."
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  messageBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
