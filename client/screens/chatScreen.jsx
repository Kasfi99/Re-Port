import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InputEmoji from "react-input-emoji-native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("");

  const handleInput = () => {
    // navigation.navigate("Job Page", { searchQuery: text });
    onChangeText("");
  };

  const [Text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  console.log(text);

  return (
    <View
      style={{ position: "absolute", bottom: 0, height: 60, marginStart: 15 }}
    >
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
    width: 380,
    height: 50,
    textAlign: "center",
    // marginHorizontal: 40,
    // alignContent: "center",
    borderWidth: 1,
    // paddingLeft: 50,
    borderRadius: 50,
  },
});
