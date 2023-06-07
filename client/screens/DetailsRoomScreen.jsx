import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import moment from "moment";
import MapView from "react-native-maps";
import PrimaryButton from "../components/button";
import { useEffect } from "react";
import { useState } from "react";
import COLORS from "../consts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../consts/ngrokUrl";
import { useNavigation } from "@react-navigation/native";

export default function DetailsRoom({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const currentParticipant = 4;
  const userId = 4;
  // console.log(id, "<<<<<");
  const [perEvent, setPerEvent] = useState({});
  const [creator, setCreator] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const [formatDate, setFormattedDate] = useState("");
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [accessToken, setAccessToken] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleOpenMaps = () => {
    const { latitude, longitude } = region;
    const label = "My Location";
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    Linking.openURL(url);
  };
  //  TOKEN
  async function getData() {
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);
      setAccessToken(token);

      const emailString = await AsyncStorage.getItem("email");
      const email = JSON.parse(emailString);
      setCurrentUserEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  // CANCEL
  const handleCancel = async () => {
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);
      // console.log(id, "<<<< INI ID HANDLE CANCEL");
      const response = await fetch(`${baseUrl}/event/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
      });
      const data = await response.json();
      console.log(data, "<< Handle Cancel");
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(accessToken, "<<EMAIL CURRENT USER");
  const fetchByEvent = async () => {
    // console.log("useEffect pertama dijalankan");
    try {
      // console.log("useEffect pertama Masuk Ke Try");
      // console.log(typeof accessToken, "<<<accessTokennya");
      const response = await fetch(`${baseUrl}/event/${id}`, {
        headers: {
          "Content-Type": "application/json",

          access_token: accessToken,
        },
      });
      const data = await response.json();
      // console.log(data.date, " DATA SEMUA <<<");
      // console.log(data, "Data dari API");
      setPerEvent(data);
      if (data.location) {
        const location = JSON.parse(data.location);
        // console.log(location.address, "LOCATIONN");
        setAddress(location.address);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      }
      let date = JSON.parse(data.date);
      // console.log(date, "<<<<");

      if (data.date && date.start && date.end) {
        const startDateTime = moment.utc(date.start);
        const endDateTime = moment.utc(date.end);

        const startMoment = startDateTime.format("dddd, D MMMM");
        const startTime = startDateTime.format("hh.mm A");
        const endTime = endDateTime.format("hh.mm A");

        const output = `${startMoment} | ${startTime} - ${endTime}`;
        // console.log(output, "ININIHHH");
        setFormattedDate(output);
      }

      if (data.creator) {
        setCreator(data.creator);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = async (status) => {
    // console.log("useEffect pertama dijalankan");
    try {
      const response = await fetch(`${baseUrl}/event/${status}/${id}`, {
        method: "Patch",
        headers: {
          "Content-Type": "application/json",

          access_token: accessToken,
        },
      });
      const data = await response.json();
      if (data.status === "Close") {
        navigation.navigate("Thankyou", {
          id: perEvent._id,
          status: perEvent.status,
        });
      }
      await fetchByEvent();
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(perEvent.participants, " <<<DARI DETAILS");
  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchByEvent();
      setIsLoading(false);
    }
  }, [accessToken]);

  //
  useEffect(() => {
    (async () => {
      const dataString = await AsyncStorage.getItem("email");
      const email = JSON.parse(dataString);
      // console.log(email, "<<<<<EMAIL");
      // console.log(perEvent.participants, "<<");

      if (perEvent) {
        const _participant = perEvent.participants.find((participant) => {
          // console.log(participant.user.email, "tttt");
          return participant.user.email === email;
        });
        if (_participant) {
          setIsJoined(true);
        }
        console.log(perEvent.creator.email, "<<<<< creator email");
        if (perEvent.creator.email === email) {
          setIsAdmin(true);
        }
      }
    })();
  }, [perEvent]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  console.log(creator, "DATA CREATOR");
  console.log(perEvent, "<<EVENT");

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          // flex: 1,
          paddingHorizontal: 15,
          paddingTop: 20,
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Sport</Text>
            <Text style={{ fontSize: 23, fontWeight: "bold" }}>
              {perEvent.title}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Date</Text>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>{formatDate}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Location</Text>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>{address}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={region}
                onPress={handleOpenMaps}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Description</Text>
            <Text style={{ fontSize: 17, fontWeight: 400 }}>
              Descriptions yayayayayayayayyyayaay
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            {isAdmin && (
              <Button
                onPress={() => {
                  handleCancel();
                }}
                title="Delete Event"
              />
            )}
            {isAdmin && perEvent.status === "Open" && (
              <Button
                onPress={() => {
                  Alert.alert(
                    "Start The Event",
                    "Do you want to start the event now?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Start Event",
                        onPress: () => handleChangeStatus("start"),
                      },
                    ]
                  );
                }}
                title="Start"
              />
            )}
            {isAdmin && perEvent.status === "Ongoing" && (
              <Button
                onPress={() => {
                  Alert.alert(
                    "Close The Event",
                    "Do you want to finish the event now?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Close Event",
                        onPress: () => handleChangeStatus("close"),
                      },
                    ]
                  );
                }}
                title="Close"
              />
            )}
            {!isAdmin && isJoined && (
              <Button
                onPress={() => {
                  handleCancel();
                }}
                title="Leave Event"
              />
            )}
            {!isAdmin && !isJoined && (
              <Button
                onPress={() => {
                  handleCancel();
                }}
                title="Join Event"
              />
            )}

            {/* {creator?.role === "user" && isJoined ? (
              <PrimaryButton
                onPress={() => {
                  handleCancel();
                }}
                title="Cancel Booking"
              />
            ) : (
              <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.btnContainer}>
                  <Text style={styles.title}>Join Booking</Text>
                </View>
              </TouchableOpacity>
            )} */}

            {/* {creator?.role === "admin" && (
              <PrimaryButton
                onPress={() => {
                  console.log("KE DELETE");
                }}
                title="Delete Event"
              />
            )} */}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    backgroundColor: "green",
    // height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 200,
    alignSelf: "center",
    // marginTop: 40,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 14,
    left: 55,
  },
  titleDesc: {
    color: COLORS.grey,
    fontSize: 13,
  },
  map: {
    width: "100%",
    height: 200,
  },
});
