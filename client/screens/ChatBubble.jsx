import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const ChatBubble = ({ message, isMe, senderName, avatar }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.rightMessageContainer : styles.leftMessageContainer,
      ]}
    >
      {!isMe && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.rightMessageBubble : styles.leftMessageBubble,
        ]}
      >
        {!isMe && <Text style={styles.senderName}>{senderName}</Text>}
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  leftMessageContainer: {
    alignItems: "flex-start",
  },
  rightMessageContainer: {
    alignItems: "flex-end",
  },
  messageBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  leftMessageBubble: {
    borderTopLeftRadius: 0,
  },
  rightMessageBubble: {
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatBubble;
