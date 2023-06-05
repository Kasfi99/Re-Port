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
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.rightMessageBubble : styles.leftMessageBubble,
        ]}
      >
        {isMe ? (
          <Text style={styles.senderName}>You</Text>
        ) : (
          <Text style={styles.senderName}>{senderName}</Text>
        )}
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Image
        source={{ uri: avatar }}
        style={[
          styles.avatar,
          isMe ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  leftMessageContainer: {
    // alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  rightMessageContainer: {
    justifyContent: "flex-end",
    // backgroundColor: "red",
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
    // backgroundColor: "green",
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 15,
  },
});

export default ChatBubble;
