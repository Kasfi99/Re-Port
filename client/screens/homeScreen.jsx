<<<<<<< HEAD
import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  return (
    <View>
      <Text> HI Ini di homepage </Text>
    </View>
  );
}
=======
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import COLORS from "../consts/colors";

import CardHome from "../components/cards";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 40 }}>
      <View style={{ flex: 1 }}>
        <CardHome />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 25,
    height: 250,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    elevation: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  addToCard: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.primaryYellow,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167
