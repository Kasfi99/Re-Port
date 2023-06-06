import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddSport = () => {
  const navigation = useNavigation();

  const [sportList, setSportList] = useState([
    {
      id: 1,
      name: "Badminton",
      icon: (
        <Image
          source={require("../assets/SportsIcon/Badminton.png")}
          style={styles.icon}
        />
      ),
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
    },
  ]);

  const handleClick = (id, name) => {
    const selectedSport = sportList.find((sport) => sport.id === id);
    if (selectedSport) {
      navigation.navigate("addEvent", { sportName: name });
    }
  };

  return (
    <View style={styles.container}>
      {sportList.map((sport) => (
        <TouchableOpacity
          key={sport.id}
          style={styles.sportContainer}
          onPress={() => handleClick(sport.id, sport.name)}
        >
          {sport.icon}
          <Text style={styles.sportName}>{sport.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sportContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "48%",
    height: 130,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
  },
  sportName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddSport;
