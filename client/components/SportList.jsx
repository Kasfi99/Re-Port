import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Touchable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SportList() {
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
  ]);
  const navigation = useNavigation();
  const handleClick = (id) => {
    setSportList((prevSportList) => {
      return prevSportList.map((sport) => {
        if (sport.id === id) {
          return {
            ...sport,
            isChecked: !sport.isChecked,
          };
        }
        return sport;
      });
    });
  };

  const handleSubmit = async () => {
    try {
      let data = [];
      sportList.forEach((el) => {
        if (el.isChecked) {
          let newObj = {
            id: el.id,
            name: el.name,
            isPressed: "Beginner",
          };
          data.push(newObj);
          el.isChecked = false;
        }
      });

      setSportList((prevSportList) => {
        return prevSportList.map((sport) => {
          return {
            ...sport,
            isChecked: false,
          };
        });
      });

      console.log(data);
      // await AsyncStorage.setItem("sportData", JSON.stringify(data));
      console.log("Data stored successfully");
    } catch (error) {
      console.log(error);
    } finally {
      // navigation.navigate("WelcomeProfile");
    }
  };

  return (
    <View>
      {sportList.map((sport) => (
        <TouchableOpacity
          key={sport.id}
          style={
            sport.isChecked ? styles.checkedContainer : styles.cardContainer
          }
          onPress={() => handleClick(sport.id)}
        >
          {sport.icon}
          <Text style={styles.cardText}>{sport.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
    backgroundColor: "#CEF249",
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
  submitButton: {
    marginLeft: "60%",
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#CEF249",
    width: 110,
    height: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  submitText: {
    fontSize: 18,
    fontFamily: "IBM-Plex-Sans",
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
    position: "relative",
    left: 25,
  },
});
