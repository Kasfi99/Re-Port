import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InputEmoji from "react-input-emoji-native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("");

  const handleInput = () => {
    onChangeText("");
  };

  console.log(text);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Send Your Message..."
        onSubmitEditing={handleInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: "25%",
    margin: "3%",
    borderWidth: 1,
    paddingLeft: "5%",
    borderRadius: 50,
  },
});
