import React from "react";
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
import axios from "axios";
import COLORS from "../consts/colors";

import CardHome from "../components/cards";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://868c-2404-8000-1001-2edf-c58d-cc18-e93-19dd.ngrok-free.app/eventlist"
        );
        const data = await response.json();
        // console.log(data);
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 40 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={events}
          renderItem={({ item }) => <CardHome event={item} />}
          keyExtractor={(item) => item._id}
          // numColumns={2}
          key={2}
        ></FlatList>
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
