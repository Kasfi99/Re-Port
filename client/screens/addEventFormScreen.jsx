import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";

// Geocoder.init("AIzaSyDJCBwVAW27Z24KW63gvImv4NZVNIwaqSA");
const GOOGLE_PLACES_API_KEY = "AIzaSyDJCBwVAW27Z24KW63gvImv4NZVNIwaqSA";

export default function AddEventFormScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: "grey",
              },
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en", // language of the results
              components: "country:id",
            }}
            // onPress={(data, details = null) => console.log(data)}
            onFail={(error) => console.error(error)}
            onPress={(data, details = null) => {
              const location = details.geometry.location;
              setSelectedLocation({
                latitude: location.lat,
                longitude: location.lng,
                address: data.description,
              });
              console.log(location);
            }}
          />
          <Button
            title="Add Location"
            onPress={() => {
              if (selectedLocation) {
                console.log("Location added:", selectedLocation);
                // Anda dapat mengirim data ini ke server atau menyimpannya dalam state atau konteks aplikasi Anda
              } else {
                console.log("No location selected");
              }
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 120,
  },
  textInputContainer: {
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#c8c7cc",
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: "#FFFFFF",
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#c8c7cc",
  },
  description: {},
  loader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
  },
});
