import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeLevel() {
  const [level, setLevel] = useState([]);

  const retrieveData = async () => {
    try {
      const dataString = await AsyncStorage.getItem("sportData");
      if (dataString) {
        const data = JSON.parse(dataString);
        setLevel(data);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log("Failed to retrieve data:", error);
    }
  };

  const handleLevelPress = (index, value) => {
    setLevel((prevLevel) => {
      const updatedLevel = [...prevLevel];
      updatedLevel[index].isPressed = value;
      return updatedLevel;
    });
  };

  const handleSubmit = () => {
    console.log(level, "<< kita submit yah");
  };
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "IBM-Plex-Sans",
            fontWeight: "700",
            marginTop: 20,
            marginBottom: 10,
            marginLeft: "10%",
          }}
        >
          How good are you at these sports?
        </Text>
        {level.map((el, index) => {
          return (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "700",
                  marginLeft: 10,
                  marginTop: 20,
                }}
              >
                {el.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 15,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      el.isPressed === "Beginner" ? "#58bfca" : "#fff",
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    borderRadius: 5,
                  }}
                  onPress={() => handleLevelPress(index, "Beginner")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "IBM-Plex-Sans",
                      color: el.isPressed === "Beginner" ? "#fff" : "black",
                    }}
                  >
                    Beginner
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      el.isPressed === "Intermediate" ? "#58bfca" : "#fff",
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    borderRadius: 5,
                  }}
                  onPress={() => handleLevelPress(index, "Intermediate")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "IBM-Plex-Sans",
                      color: el.isPressed === "Intermediate" ? "#fff" : "black",
                    }}
                  >
                    Intermediate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      el.isPressed === "Advanced" ? "#58bfca" : "#fff",
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    borderRadius: 5,
                  }}
                  onPress={() => handleLevelPress(index, "Advanced")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "IBM-Plex-Sans",
                      color: el.isPressed === "Advanced" ? "#fff" : "black",
                    }}
                  >
                    Advanced
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        })}
        <Text
          style={{
            width: "90%",
            marginTop: 20,
            marginHorizontal: "4%",
            textAlign: "center",
            fontSize: 13,
            fontWeight: "700",
            fontFamily: "IBM-Plex-Sans",
          }}
        >
          You'll be able to do a self skill assessment for the popular sports to
          better gauge your level later on
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#58bfca",
            paddingVertical: 10,
            width: "40%",
            borderRadius: 10,
            marginTop: 20,
            marginLeft: "55%",
          }}
          onPress={() => handleSubmit()}
        >
          <Text
            style={{
              paddingHorizontal: "20%",
              color: "white",
              fontFamily: "IBM-Plex-Sans",
              fontSize: 16,
            }}
          >
            I'm All Good
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
