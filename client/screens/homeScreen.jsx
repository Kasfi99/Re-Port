import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import COLORS from "../consts/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardHome from "../components/cards";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import baseUrl from "../consts/ngrokUrl";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [filter, setfilter] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleNotification = () => {
    // console.log("udah bisa di click");
  };

  const handleSeeAllEvents = () => {
    console.log("Ayo kita see all");
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);
      setAccessToken(token);
      // Lakukan sesuatu menggunakan access_token
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(accessToken, "<<TOKEEEn");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <ScrollView>
          <View
            style={{
              height: 220,
              width: "100%",
              paddingBottom: 20,
              backgroundColor: "#A5DC281C",
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              backgroundImage:
                "https://thumbs.dreamstime.com/z/sports-hand-drawn-doodles-seamless-pattern-vector-background-line-art-detailed-lots-objects-153896513.jpg",
            }}
          >
            <TouchableOpacity onPress={() => handleNotification()}>
              <Ionicons
                name="notifications-outline"
                size={30}
                style={{
                  position: "absolute",
                  top: 70,
                  right: 30,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "teal",
                position: "absolute",
                left: -10,
                top: 30,
                width: "50%",
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 100,
                  borderColor: "black",
                  borderWidth: 2,
                  overflow: "hidden",
                  marginLeft: "23%",
                  marginTop: 30,
                  marginBottom: 20,
                }}
              >
                <Image
                  source={require("../assets/Male.png")}
                  style={{
                    height: 80,
                    width: 80,
                    position: "absolute",
                    left: -7,
                    backgroundColor: "#A5DC281C",
                  }}
                ></Image>
              </View>
              <View
                style={{
                  marginTop: "20%",
                  left: "8%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Hi kasfi
                </Text>
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Jakarta
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.search}
                onChangeText={(text) => setfilter(text)}
                value={filter}
                placeholder="Search Cool Event Nearby"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "IBM-Plex-Sans",
                fontWeight: "800",
                fontSize: 18,
                marginLeft: "5%",
              }}
            >
              Activities Nearby
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: "35%",
              }}
              onPress={() => handleSeeAllEvents()}
            >
              <Text
                style={{
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "800",
                  fontSize: 18,

                  color: "#A5DC28",
                }}
              >
                SEE ALL
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 300,
            }}
          >
            <CardHome filter={filter} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 25,
    height: 250,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    elevation: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  inputContainer: {
    width: "70%",
    position: "absolute",
    top: "80%",
    left: "15%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  search: {
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 20,
    marginBottom: 20,
  },
  addToCard: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.primaryYellow,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
