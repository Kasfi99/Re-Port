import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import SportList from "../components/SportList";
import AddSport from "../components/addSport";

export default function WelcomeSport({ route }) {
  const { isAddEvent } = route.params;
  const [search, setSearch] = useState("");

  // console.log(search);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        {!isAddEvent && (
          <View>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 20,
                fontSize: 20,
                fontFamily: "IBM-Plex-Sans",
                fontWeight: "500",
              }}
            >
              What Sports do you play?
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.search}
                onChangeText={(text) => setSearch(text)}
                value={search}
                placeholder="Search"
              />
            </View>
          </View>
        )}
        {isAddEvent ? (
          <Text
            style={{
              fontSize: 24,
              marginTop: 30,
              marginLeft: 10,
              fontFamily: "IBM-Plex-Sans",
              fontWeight: "600",
            }}
          >
            Select the Sport for Your Event
          </Text>
        ) : (
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
        )}
        {isAddEvent ? <AddSport /> : <SportList />}
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
  search: {
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
