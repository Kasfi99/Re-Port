import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SportList() {
  const [selectedSports, setSelectedSports] = useState([]);
  const navigation = useNavigation();

  console.log(selectedSports);
  const sportList = [
    {
      id: 1,
      name: "Badminton",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Badminton.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 2,
      name: "Basketball",
      icon: (
        <Image
          source={require("../assets/SportsIcon/BasketBall.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 3,
      name: "Volleyball",
      icon: (
        <Image
          source={require("../assets/SportsIcon/VolleyBall.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 4,
      name: "Swimming",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Swimming.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 5,
      name: "Bowling",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Bowling.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 6,
      name: "Billiard Pool",
      icon: (
        <Image
          source={require("../assets/SportsIcon/BilliardBall.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 7,
      name: "Tennis",
      icon: (
        <Image
          source={require("../assets/SportsIcon/TennisBall.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 8,
      name: "Running",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Running.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 9,
      name: "Boxing",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Boxing.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
    {
      id: 10,
      name: "Weightlifting",
      icon: (
        <Image
          source={require("../assets/SportsIcon/WeightLifting.png")}
          style={styles.icon}
        />
      ),
      isChecked: false,
    },
  ];

  console.log(sportList[0].isChecked, "<<<");
  return (
    <View>
      {sportList.map((s) => {
        return (
          <TouchableOpacity>
            <View
              key={s.id}
              style={
                s.isChecked ? styles.checkedContainer : styles.cardContainer
              }
              onPress={() => {
                s.isChecked ? (s.isChecked = false) : (s.isChecked = true);
                navigation.navigate("WelcomeSport");
              }}
            >
              {s?.icon}
              <Text style={styles.cardText}>{s.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: 320,
    height: 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkedContainer: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "red",
    width: 320,
    height: 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  lastCardContainer: {
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "white",
    width: 320,
    height: 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 15,
    marginRight: 10,
  },
});
