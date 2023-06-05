import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Divider = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export const CardDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    borderWidth: 0.5,
    borderColor: "#000",
  },
  text: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
