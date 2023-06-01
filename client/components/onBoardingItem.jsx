import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

export default function OnBoardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 0.7,
    justifyContent: "center",
  },

  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#CEF249",
    textAlign: "center",
    marginTop: 20,
  },

  description: {
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
