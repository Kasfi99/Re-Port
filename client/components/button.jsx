import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import COLORS from "../consts/colors";

export default function PrimaryButton({ title, onPress = () => {} }) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.dark,
    height: 30,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 80,
    position: "absolute",
    right: 10,
    top: -220,
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    width: 80,
    position: "absolute",
    top: 7,
    left: 10,
  },
});
