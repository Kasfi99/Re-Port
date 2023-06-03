import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = "AIzaSyDJCBwVAW27Z24KW63gvImv4NZVNIwaqSA";

export default function AddEventFormScreen() {
  const [eventTitle, setEventTitle] = useState("");
  const [participants, setParticipants] = useState(2);
  const [courtPrice, setCourtPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setShowStartTimePicker(true);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      setShowEndTimePicker(true);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleShowStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  const handleShowEndTimePicker = () => {
    setShowEndTimePicker(true);
  };

  const handleIncreaseParticipants = () => {
    setParticipants(participants + 1);
  };

  const handleDecreaseParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };

  const handleSubmit = () => {
    const eventData = {
      eventTitle,
      participants,
      courtPrice,
      date,
      startTime,
      endTime,
      selectedLocation,
    };
    console.log("Event Data:", eventData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Title:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEventTitle}
        value={eventTitle}
        placeholder="Enter event title"
      />
      <Text style={styles.label}>Participants:</Text>
      <View style={styles.participantsContainer}>
        {participants > 1 && (
          <TouchableOpacity onPress={handleDecreaseParticipants}>
            <Text style={styles.participantsButton}>-</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.participantsText}>{participants}</Text>
        <TouchableOpacity onPress={handleIncreaseParticipants}>
          <Text style={styles.participantsButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Court Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourtPrice}
        value={courtPrice}
        placeholder="Enter court price"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Date of Event:</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={handleShowDatePicker}
      >
        <Text style={styles.datePickerButtonText}>
          {date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          {startTime.toLocaleTimeString("id-ID", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {endTime.toLocaleTimeString("id-ID", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}

      <Text style={styles.label}>Location:</Text>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => setIsLocationModalVisible(true)}
      >
        <Text style={styles.locationButtonText}>
          {selectedLocation ? selectedLocation.address : "Enter Location"}
        </Text>
      </TouchableOpacity>
      <Modal visible={isLocationModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsLocationModalVisible(false)}>
              <Text style={styles.modalHeaderText}>Cancel</Text>
            </TouchableOpacity>
            {/* <Text style={styles.modalHeaderText}>Select Location</Text>
            <TouchableOpacity onPress={() => setIsLocationModalVisible(false)}>
              <Text style={styles.modalHeaderText}>Done yaa</Text>
            </TouchableOpacity> */}
          </View>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={1}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const location = details.geometry.location;
              setSelectedLocation({
                latitude: location.lat,
                longitude: location.lng,
                address: data.description,
              });
              setIsLocationModalVisible(false);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
              components: "country:id",
            }}
            styles={{
              textInput: {
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                marginTop: 10,
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
              listView: {
                backgroundColor: "white",
                borderRadius: 10,
                marginTop: 10,
                zIndex: 1,
              },
            }}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectSuggestion(item);
                      setIsLocationModalVisible(false);
                    }}
                  >
                    <Text style={styles.suggestion}>{item.description}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.place_id}
                keyboardShouldPersistTaps="always"
              />
            )}
          />
        </View>
      </Modal>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  participantsButton: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  participantsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationButton: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  locationButtonText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007aff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestion: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalHeaderText: {
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  datePickerButtonText: {
    fontSize: 16,
  },
  hiddenInput: {
    height: 0,
    width: 0,
    opacity: 0,
  },
});
