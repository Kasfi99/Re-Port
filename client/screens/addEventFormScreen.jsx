import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

export default function AddEventFormScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Search for an address"
          placeholderTextColor="#000"
          style={styles.searchBox}
          onChangeText={(text) => this.searchLocation(text)}
          value={this.state.searchKeyword}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
