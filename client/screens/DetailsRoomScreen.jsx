import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";
import MapView from "react-native-maps";
import PrimaryButton from "../components/button";
import { useEffect } from "react";
import { useState } from "react";
import COLORS from "../consts/colors";

export default function DetailsRoom({ route }) {
  const { event } = route.params;
  const [perEvent, setPerEvent] = useState({});
  // console.log(perEvent);
  // const creatorId = perEvent.creator._id;
  // console.log(perEvent, "perEvent");
  const [creatorId, setCreatorId] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const date = moment(perEvent.date).format("dddd, D MMMM YYYY");

  // Memformat waktu mulai
  const startTime = moment(perEvent.startTime).format("HH.mm A");
  // Memformat waktu selesai
  const endTime = moment(perEvent.endTime).format("HH.mm A");

  const currentParticipant = 1;
  const userId = 1;

  const handleOpenMaps = () => {
    const { latitude, longitude } = region;
    const label = "My Location";
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    async function fetchByEvent() {
      try {
        const response = await fetch(
          `https://868c-2404-8000-1001-2edf-c58d-cc18-e93-19dd.ngrok-free.app/event/${event._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2NkMGM4ZTU4YjliNDg5OTk3M2Y4NCIsImVtYWlsIjoidGVzdDFAbWFpbC5jb20iLCJpYXQiOjE2ODU5MDM2MTB9.wTXqGh0tNPxL4gWfOY4KQmkjYdEfCCbH6OiE93pXvio",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const data = await response.json();
        // console.log(data);
        setPerEvent(data);
        if (data.location) {
          const location = JSON.parse(data.location);
          console.log(location.address, "LOCATIONN");
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
        if (data.creator) {
          setCreatorId(data.creator._id);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchByEvent();
  }, []);
  // console.log(creatorId, "<<");
  console.log(address, "<<<<<<");

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Sport</Text>
            <Text style={{ fontSize: 23, fontWeight: "bold" }}>
              {perEvent.title}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleDesc}>Date</Text>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>{date}</Text>
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
            {currentParticipant === userId ? (
              <PrimaryButton
                onPress={() => {
                  navigation.navigate("DetailsRoom");
                }}
                title="Cancel Booking"
              />
            ) : (
              <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.btnContainer}>
                  <Text style={styles.title}>Join Booking</Text>
                </View>
              </TouchableOpacity>
            )}
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
