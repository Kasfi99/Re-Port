import React, { useState } from "react";
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

const ModalEdit = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

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

  const handleSubmitEdit = async () => {
    setName("");
    setUserName("");
    setEmail("");
    setGender("Male");
    const newObj = {
      name,
      userName,
      email,
      gender,
    };
    console.log(newObj, "<<<<<");
    setModalVisible(false);
  };

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
                  {!image && (
                    <Image
                      source={{ uri: "https://via.placeholder.com/150" }}
                      style={{
                        width: 85,
                        height: 85,
                        borderRadius: 50,
                        marginLeft: "32%",
                        marginRight: 20,
                        marginTop: 10,
                      }}
                    />
                  )}
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 85,
                        height: 85,
                        borderRadius: 50,
                        marginLeft: "32%",
                        marginRight: 20,
                        marginTop: 10,
                      }}
                    />
                  )}
                  <Ionicons
                    name="create"
                    size={32}
                    style={{
                      color: COLORS.primaryGreen,
                      position: "relative",
                      top: -25,
                      left: 185,
                    }}
                  />
                </Pressable>
                <Text
                  style={[
                    styles.inputText,
                    {
                      position: "relative",
                      top: -20,
                      left: 80,
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
                    value={name}
                    placeholder="Tell us Your Name"
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Username</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="Something like BlackDragon01"
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
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
