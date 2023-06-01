import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function MyDateTimePicker() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const selectedDate = new Date(date);
      selectedDate.setHours(selectedTime.getHours());
      selectedDate.setMinutes(selectedTime.getMinutes());
      setDate(selectedDate);
    }
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    console.log("Selected Date and Time:", date.toLocaleString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date and Time of Event:</Text>
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
          {date.toLocaleTimeString("id-ID", {
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
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <TextInput
        style={styles.hiddenInput}
        value={date.toLocaleString()}
        editable={false}
      />
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
});
