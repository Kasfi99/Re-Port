import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PickerSport = () => {
  const [value, setValue] = useState([]);

  const getValue = async () => {
    const dataString = await AsyncStorage.getItem("sportData");
    const data = JSON.parse(dataString);
    console.log(data, "<< ini data");
    setValue(data);
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
      >
        {value.map((el) => {
          <Picker.Item label={el.name} value={el.name} />;
          return;
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "red",
    opacity: 0.2,
  },
});

export default PickerSport;
