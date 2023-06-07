import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "./ChatBubble";
import io from "socket.io-client"
import baseUrl from "../consts/ngrokUrl";
const socket = io.connect(baseUrl)
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen({route}) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState("")



  useEffect(() => {
    const getEmail = async()=> {
      try {
        const userData = await AsyncStorage.getItem("email");
      const userEmail = JSON.parse(userData);
      setUserEmail(userEmail)
     } catch(err){
      console.log(err)
     }
      }
      
    getEmail();
    socket.on("message-stored", data => {
      console.log(data, "message stored")
    })
  }, [socket])

  // const handleSend = () => {
  //   console.log("Pesan yang dikirim:", message);
  //   setMessages([
  //     ...messages,
  //     { id: messages.length, text: message, isMe: true },
  //   ]);
  //   setMessage("");
  // };
  const handleSend = () => {

    // console.log(getEmail())
    // let email =  getEmail()
    // console.log(email, "email")
    socket.emit("message-received", {eventId: id, userEmail: userEmail, message: message })
    console.log("Pesan yang dikirim:", message);
    setMessages([
      ...messages,
      {
        id: messages.length,
        text: message,
        isMe: true,
        senderName: "Marimar",
        avatar: "https://img.freepik.com/free-icon/user_318-159711.jpg",
      },
    ]);
    setMessage("");
  };

  const renderMessage = ({ item }) => {
    return (
      <ChatBubble
        message={item.text}
        isMe={item.isMe}
        senderName={item.senderName}
        avatar={item.avatar}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
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
