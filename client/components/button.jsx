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
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 280,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 14,
    left: 55,
  },
});