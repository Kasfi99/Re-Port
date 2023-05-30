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
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Send Your Message..."
        onSubmitEditing={handleInput}
      />
      {/* <Text>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </Text> */}
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
