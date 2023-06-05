import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "../components/Divider";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleInput = async () => {
    let newObj = {
      email: email,
    };

    try {
      await AsyncStorage.setItem("Email", JSON.stringify(newObj));
      console.log("Data stored successfully");
    } catch (error) {
      console.log("Failed to store data:", error);
    }

    onChangeEmail("");
    onChangePassword("");
    setName("");
    setUsername("");
    return navigation.navigate("Login");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleGuest = () => {
    console.log("masuk sebagai user"); //jangan lupa tambahin
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Enter Your Mobile Number</Text>

      <View
        style={
          (styles.inputContainer,
          { marginTop: 60, marginLeft: "5%", width: "100%" })
        }
      >
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Fill Your Name Here!"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.usernameInput}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Choose Your Cool Name Here"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.Emailinput}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          placeholder="Set Your Awesome Email Here!"
        />
      </View>

      <View
        style={{
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.Passwordinput}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          placeholder="*********"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          return handleInput();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View
        style={{
          width: "95%",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            marginLeft: 25,
            color: "#565966",
          }}
        >
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from App and its affiliates to the
          number provided.
        </Text>
      </View>

      <View style={styles.line}>
        <Divider text="or" />
      </View>

      <TouchableOpacity
        style={styles.facebookButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Register by Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Register by Google</Text>
      </TouchableOpacity>

      <View style={{ width: "95%", position: "absolute", bottom: 30 }}>
        <Text
          style={{
            marginTop: 10,
            marginLeft: "28%",
            color: "#565966",
            fontFamily: "IBM-Plex-Sans",
          }}
        >
          Already have an account yet?
        </Text>
        <View style={{ flexDirection: "row", marginLeft: "26%" }}>
          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={{
                marginTop: 10,
                color: "black",
                textDecorationLine: "underline",
                fontFamily: "IBM-Plex-Sans",
              }}
            >
              Login here
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              color: "#565966",
              fontFamily: "IBM-Plex-Sans",
            }}
          >
            {" "}
            or{" "}
          </Text>
          <TouchableOpacity onPress={handleGuest}>
            <Text
              style={{
                marginTop: 10,
                color: "black",
                textDecorationLine: "underline",
                fontFamily: "IBM-Plex-Sans",
              }}
            >
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  textHeader: {
    position: "absolute",
    top: 20,
    left: 10,
    color: "#232323",
    fontFamily: "IBM-Plex-Sans",
    fontWeight: "800",
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  nameInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  usernameInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  Emailinput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  Passwordinput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    marginTop: 20,
    height: 40,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "IBM-Plex-Sans",
    fontWeight: "800",
  },
  line: {
    marginTop: 20,
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "black",
    height: 40,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "black",
    height: 40,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontFamily: "IBM-Plex-Sans",
    fontWeight: "800",
  },
});
