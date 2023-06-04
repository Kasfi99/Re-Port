import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import PrimaryButton from "../components/button";

export default function DetailsRoom() {
  const currentParticipant = 1;
  const userId = 1;
  const region = {
    latitude: -6.223508199999999,
    longitude: 106.804848,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const handleOpenMaps = () => {
    const { latitude, longitude } = region;
    const label = "My Location";
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginLeft: 30, marginTop: 60 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
          <Text>Badminton</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            PB KARET TENGSIN
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Date</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Today, 8 pm - 10 pm
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Location</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Gelanggan remaja Tanah Abang
          </Text>
        </View>
        <View style={{ marginBottom: 250 }}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={region}
              onPress={handleOpenMaps}
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Description</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Descriptions yayayayayayayayyyayaay
          </Text>
        </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    backgroundColor: "green",
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 200,
    alignSelf: "center",
    marginTop: 40,
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
  map: {
    width: "100%",
    height: 200,
  },
});
