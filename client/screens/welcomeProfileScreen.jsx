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
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../consts/colors";

export default function WelcomeProfile() {
  const [image, setImage] = useState(null);

  console.log(image, "<<<ini images");
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Male",
      image: (
        <Image source={require("../assets/Male.png")} style={styles.icon} />
      ),
      isPressed: true,
    },
    {
      id: 2,
      name: "Female",
      image: (
        <Image source={require("../assets/Female.png")} style={styles.icon} />
      ),
      isPressed: false,
    },
  ]);
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLocation = () => {
    //write here for lo.name
  };

  const onSubmit = async () => {
    try {
      const gender = profiles.find((el) => el.isPressed === true);
      // console.log(gender.name);

      const dataString = await AsyncStorage.getItem("access_token");
      const access_token = JSON.parse(dataString);

      // console.log(access_token);
      const { data } = await axios.put(
        "https://932d-139-228-111-126.ngrok-free.app/user/editGenderProf",
        { gender: gender.name },
        { headers: { access_token } }
      );

      // console.log(data, "<<<< masuk");
      // write here for onSubmit
      navigation.navigate("WelcomeLevel");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: "IBM-Plex-Sans",
          fontWeight: "700",
          marginTop: 10,
          marginBottom: 10,
          marginLeft: "15%",
        }}
      >
        Tell Me more about You
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginLeft: "5%",
          marginTop: "5%",
        }}
      >
        Are You a Handsome Mister or Beautiful Princess?
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "IBM-Plex-Sans",
          fontWeight: "800",
          marginTop: 10,
          marginLeft: "40%",
        }}
      >
        Gender
      </Text>
      <TouchableOpacity onPress={() => pickImage()}>
        <View
          style={{
            height: 180,
            width: 180,
            borderRadius: 100,
            borderColor: "black",
            borderWidth: 3,
            overflow: "hidden",
            marginLeft: "23%",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          {profiles[0].isPressed ? profiles[0].image : profiles[1].image}
        </View>
      </TouchableOpacity>
      <Ionicons
        name="create"
        size={40}
        style={{
          color: COLORS.primaryGreen,
          position: "relative",
          top: -40,
          left: 230,
        }}
        onPress={() => pickImage()}
      />
      <View
        style={{
          width: "60%",
          flexDirection: "row",
          marginLeft: "18%",
          marginTop: 0,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: profiles[0].isPressed ? "#CEF249" : "#FFFFFF",
            borderColor: profiles[0].isPressed ? "#FFFFFF" : "#CEF249",
            borderWidth: 2,
            borderRightWidth: 0,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 40,
          }}
          onPress={() =>
            setProfiles((prevProfiles) => [
              {
                ...prevProfiles[0],
                isPressed: true,
              },
              {
                ...prevProfiles[1],
                isPressed: false,
              },
            ])
          }
        >
          <Text>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: profiles[1].isPressed ? "#CEF249" : "#FFFFFF",
            borderColor: profiles[1].isPressed ? "#FFFFFF" : "#CEF249",
            borderWidth: 2,
            borderLeftWidth: 0,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 40,
          }}
          onPress={() =>
            setProfiles((prevProfiles) => [
              {
                ...prevProfiles[0],
                isPressed: false,
              },
              {
                ...prevProfiles[1],
                isPressed: true,
              },
            ])
          }
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "IBM-Plex-Sans",
          fontWeight: "600",
          marginTop: 30,
          marginBottom: 20,
          marginLeft: "28%",
        }}
      >
        Your city or disctrict
      </Text>
      <TouchableOpacity
        style={{
          borderColor: "#CEF249",
          borderWidth: 2,
          marginLeft: "15%",
          paddingVertical: 10,
          width: "70%",
          borderRadius: 10,
        }}
        onPress={() => handleLocation()}
      >
        <Text
          style={{
            marginLeft: "30%",
            fontFamily: "IBM-Plex-Sans",
            fontSize: 18,
            color: "#A5DC28",
            fontWeight: "900",
          }}
        >
          Select Location
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginBottom: 70,
        }}
      ></View>
      <TouchableOpacity
        style={{
          width: "90%",
          backgroundColor: "#6F7380",
          marginLeft: "5%",
          borderRadius: 10,
          paddingVertical: 10,
        }}
        onPress={() => onSubmit()}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            paddingLeft: "45%",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 200,
    height: 200,
    backgroundColor: "white",
    position: "relative",
    right: 15,
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
