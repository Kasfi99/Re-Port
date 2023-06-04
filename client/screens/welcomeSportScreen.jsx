import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import SportList from "../components/SportList";

export default function WelcomeSport(props) {
  const [search, setSearch] = useState("");

  console.log(search);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            marginTop: 20,
            fontSize: 20,
            fontFamily: "IBM-Plex-Sans",
            fontWeight: "500",
            alignItems: "center",
          }}
        >
          What Sports do you play?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.Passwordinput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search"
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            marginTop: 30,
            marginLeft: 10,
            fontFamily: "IBM-Plex-Sans",
            fontWeight: "600",
          }}
        >
          Popular Sports
        </Text>
        <SportList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    marginLeft: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  Passwordinput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  cardContainer: {
    marginLeft: 30,
    marginTop: 20,
    backgroundColor: "white",
    width: 320,
    height: 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontFamily: "IBM-Plex-Sans",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 40,
    position: "relative",
    left: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
