import React, { useEffect } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "../components/Divider";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const handleInput = () => {
    onChangeEmail("");
    onChangePassword("");
    return navigation.navigate("WelcomeSport");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleGuest = () => {
    console.log("masuk sebagai user"); // Jangan lupa ditambah ganti
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Enter Your Mobile Number</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.Emailinput}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          placeholder="Your Email"
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
          placeholder="Your Password"
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
        <Text style={styles.loginText}>Login by Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Login by Google</Text>
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
          Don't have an account yet?
        </Text>
        <View style={{ flexDirection: "row", marginLeft: "23%" }}>
          <TouchableOpacity onPress={handleRegister}>
            <Text
              style={{
                marginTop: 10,
                color: "black",
                textDecorationLine: "underline",
                fontFamily: "IBM-Plex-Sans",
              }}
            >
              Register here
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
    marginTop: 60,
    alignItems: "center",
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
