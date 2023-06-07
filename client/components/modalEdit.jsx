import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import COLORS from "../consts/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import PickerSport from "./pickerSport";
import baseUrl from "../consts/ngrokUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ModalEdit = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(user?.gender ? user.gender : "Male");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(<Image source={{ uri: image }} style={styles.icon} />);

    await AsyncStorage.setItem("profile_picture", JSON.stringify(image));

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const ext = uri.split(".").pop();
      const name = uri.split("/").pop();
      setImage({
        uri: uri,
        type: `image/${ext}`,
        name,
      });
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("username", userName);
      body.append("email", email);
      body.append("gender", gender);
      body.append("images", image);

      const dataString = await AsyncStorage.getItem("access_token");
      const access_token = JSON.parse(dataString);
      console.log(name, userName, email, pic, access_token, "<<<<< disini cok");

      const { data } = await axios({
        method: "PUT",
        url: `${baseUrl}/user/editProfile`,
        data: body,
        headers: {
          access_token,
          "Content-Type": `multipart/form-data`,
        },
      });

      console.log(data, "<< ini user habis di edit");
      setName("");
      setUserName("");
      setEmail("");
      setGender("Male");
      setModalVisible(false);
    } catch (error) {
      console.log("editnya gagal karena : ", error);
    }
  };

  const getuserData = async () => {
    try {
      const dataString = await AsyncStorage.getItem("user");
      const dataString2 = await AsyncStorage.getItem("access_token");
      if (dataString) {
        const user = JSON.parse(dataString);
        const accessToken = JSON.parse(dataString2);

        console.log(user, "<< ini user");
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/user/data/${user.id}`,
          headers: {
            accessToken,
          },
        });
        console.log(data, "<<< data user di profile");
        setUser(data);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log("Failed to retrieve data:", error);
    }
  };

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                marginLeft: 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "IBM-Plex-Sans",
                  fontSize: 20,
                  fontWeight: "800",
                  marginTop: 20,
                  marginLeft: "15%",
                  marginBottom: 20,
                  color: COLORS.primaryGreen,
                }}
              >
                Update Your Cool Info Here!
              </Text>
              <View
                style={{
                  marginLeft: "10%",
                }}
              >
                <Pressable onPress={() => pickImage()}>
                  <Image
                    source={{ uri: image ? image : user?.pic }}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 50,
                      marginLeft: "32%",
                      marginRight: 20,
                      marginTop: 10,
                    }}
                  />
                </Pressable>
                <Text
                  style={[
                    styles.inputText,
                    {
                      position: "relative",
                      top: 10,
                      left: 80,
                      marginBottom: 10,
                    },
                  ]}
                >
                  Change Profile Image
                </Text>
                <View>
                  <Text style={styles.inputText}>Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name ? name : user?.name}
                    placeholder="Tell us Your Name"
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Username</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={
                      userName
                        ? userName
                        : user?.username
                        ? user.userName
                        : "Great Sport Player"
                    }
                    placeholder="Something like BlackDragon01"
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email ? email : user?.email}
                    placeholder="DarkLord@Muspelheim.com"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 16,
                    color: "white",
                    marginBottom: 10,
                    marginLeft: "1%",
                  }}
                >
                  Gender
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    width: 300,
                    height: 40,
                    flexDirection: "row",
                    borderRadius: 10,
                    marginBottom: 20,
                    marginLeft: "0%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        gender === "Male" ? COLORS.primaryGreen : "white",
                      width: 140,
                      height: "100%",
                      borderRadius: 10,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    onPress={() => setGender("Male")}
                  >
                    <Text
                      style={{
                        fontFamily: "IBM-Plex-Sans",
                        fontSize: 16,
                        position: "absolute",
                        fontWeight: gender === "Male" ? "bold" : "400",
                        top: 8,
                        left: 18,
                      }}
                    >
                      Mr.Handsome
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        gender === "Female" ? COLORS.primaryGreen : "white",
                      width: 160,
                      height: "100%",
                      borderRadius: 10,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onPress={() => setGender("Female")}
                  >
                    <Text
                      style={{
                        fontFamily: "IBM-Plex-Sans",
                        fontSize: 16,
                        position: "absolute",
                        color: gender === "Female" ? "black" : "black",
                        fontWeight: gender === "Female" ? "bold" : "400",
                        top: 8,
                        left: 10,
                      }}
                    >
                      Charming Princess
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons
                  name="close-circle"
                  size={40}
                  style={{
                    color: "red",
                    position: "absolute",
                    right: -10,
                    top: -570,
                  }}
                />
              </Pressable>
              {/* <PickerSport /> */}
              <Pressable
                style={{
                  width: 20,
                  height: 30,
                  borderRadius: 20,
                  backgroundColor: COLORS.primaryGreen,
                  position: "absolute",
                  bottom: -40,
                  marginLeft: "37%",
                }}
                onPress={() => handleSubmitEdit()}
              >
                <Text
                  style={{
                    color: "#191B23",
                    fontWeight: "800",
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 20,
                    marginLeft: "15%",
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Edit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  modalView: {
    width: "95%",
    height: 630,
    backgroundColor: "#191B23",
    borderRadius: 20,

    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    width: 70,
    height: 25,
    borderRadius: 20,
    position: "absolute",
    top: 30,
    left: -70,
  },
  buttonOpen: {
    backgroundColor: COLORS.primaryGreen,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputText: {
    fontFamily: "IBM-Plex-Sans",
    color: "white",
    fontWeight: "700",
  },
  icon: {
    width: 85,
    height: 85,
    borderRadius: 50,
    marginLeft: "32%",
    marginRight: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: COLORS.primaryGreen,
    backgroundColor: "white",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default ModalEdit;
