import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CardDivider } from "./Divider";

export default function CardHome({ filter }) {
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleJoinEvent = (id) => {
    console.log(id + "Bisa Ditekan");
  };

  const dummyData = [
    {
      id: 1,
      name: "MABAR BADMINTON SELASA PETANG (BEGINNER) ONLY",
      url: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
      sport: "Badminton",
      participant: ["kasfi", "chris", "benita", "nadel"],
      price: 40000,
      status: "One-Time only",
      place: "Lapangan Bulu Tangkis Grogol",
      time: "05/06/2022",
    },
    {
      id: 2,
      name: "MABAR FUTSAL RABU SORE (INTERMEDIATE) ONLY",
      url: "https://images.unsplash.com/photo-1523905338453-2a4d3093353f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZ1dHNhbCUyMHNvcnNjaGFpbmclMjBmdXRzYWx8ZW58MHx8fHwxNjIzMTYwODc0&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Futsal",
      participant: ["john", "michael", "lisa", "sarah"],
      price: 50000,
      status: "One-Time only",
      place: "Futsal Court ABC",
      time: "06/06/2022",
    },
    {
      id: 3,
      name: "BASKETBALL PICK-UP GAME",
      url: "https://images.unsplash.com/photo-1531919320171-41a44d07d523?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFza2V0YmFsbCUyMGJhc2tldGJhbGx8ZW58MHx8fHwxNjIzMTYwODc0&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Basketball",
      participant: ["david", "emily", "james"],
      price: 30000,
      status: "One-Time only",
      place: "Basketball Court XYZ",
      time: "06/06/2022",
    },
    {
      id: 4,
      name: "YOGA CLASS",
      url: "https://images.unsplash.com/photo-1564030358-bc3b8f587ce6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYSUyMGNsYXNzJTIwZnJpZW5kc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Yoga",
      participant: ["olivia", "samuel"],
      price: 25000,
      status: "One-Time only",
      place: "Yoga Studio",
      time: "07/06/2022",
    },
    {
      id: 5,
      name: "RUNNING CLUB",
      url: "https://images.unsplash.com/photo-1565299024-8b3a2911f0f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGJhc2tldGJhbGwlMjBjbHVifGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Running",
      participant: ["oliver"],
      price: 0,
      status: "Recurring",
      place: "City Park",
      time: "08/06/2022",
    },
    {
      id: 6,
      name: "CYCLING GROUP",
      url: "https://images.unsplash.com/photo-1519317676404-99f32a63e7f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGN5Y2xpbmclMjBncm91cHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Cycling",
      participant: ["william", "sophia", "oliver", "ava", "mia"],
      price: 15000,
      status: "Recurring",
      place: "Cycling Track",
      time: "09/06/2022",
    },
    {
      id: 7,
      name: "TENNIS LESSONS",
      url: "https://images.unsplash.com/photo-1551224909-0c9e382b22b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHRlbm5pcyUyMGRldGFpbHN8ZW58MHx8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Tennis",
      participant: ["emma", "noah", "mia", "alexander", "ava"],
      price: 60000,
      status: "Recurring",
      place: "Tennis Court",
      time: "10/06/2022",
    },
    {
      id: 8,
      name: "SWIMMING TRAINING",
      url: "https://images.unsplash.com/photo-1578312751262-992386b1a97b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3dpbW1pbmclMjBzdHJhaW5pbmd8ZW58MHx8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      sport: "Swimming",
      participant: ["olivia", "jack", "charlotte", "jacob"],
      price: 45000,
      status: "Recurring",
      place: "Swimming Pool",
      time: "11/06/2022",
    },
  ];

  useEffect(() => {
    if (filter) {
      const filtered = dummyData.filter((el) =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dummyData);
    }
  }, [filter]);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("eventRoom", { event })}
      >
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1677543938005-6e0eb736dc19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 14 }}>SPORT</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 2,
                color: COLORS.dark,
              }}
            >
              Event Title
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rp price</Text>
            <View style={styles.addToCard}>
              <Icon name="add" size={20} color={"white"} />
            </View>
          </View>
          <PrimaryButton
            onPress={() => {
              navigation.navigate("DetailsRoom");
            }}
            title="Join Event"
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        {filteredData &&
          filteredData.map((el) => {
            const greenSlots = el.participant.length;
            const remainingSlots = 8 - greenSlots;

            return (
              <View
                key={el.id}
                style={{
                  width: "85%",
                  backgroundColor: "white",
                  marginTop: 30,
                  borderRadius: 30,
                  shadowColor: "#000",
                  shadowOpacity: 0.8,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBM-Plex-sans",
                    fontWeight: "600",
                    marginTop: 20,
                    marginLeft: 10,
                  }}
                >
                  {el.sport} Meetup
                </Text>
                <Text
                  style={{
                    fontFamily: "IBM-Plex-sans",
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 10,
                    width: "95%",
                  }}
                >
                  {el.name}
                </Text>
                <View
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {[...Array(greenSlots)].map((_, index) => (
                      <Ionicons
                        key={index}
                        name="person-circle-outline"
                        size={28}
                        color={"green"}
                      />
                    ))}
                    {[...Array(remainingSlots)].map((_, index) => (
                      <Ionicons
                        key={index + greenSlots}
                        name="person-circle-outline"
                        size={28}
                        color={"black"}
                      />
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 25,
                    marginTop: 10,
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "IBM-Plex-Sans",
                    }}
                  >
                    {el.participant.length}/8 Playing
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "IBM-Plex-Sans",
                    }}
                  >
                    {el.price} IDR/Person
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <CardDivider />
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "IBM-Plex-Sans",
                      fontWeight: "700",
                    }}
                  >
                    Date : {el.time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "IBM-Plex-Sans",
                      marginBottom: 5,
                    }}
                  >
                    {el.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "IBM-Plex-Sans",
                    }}
                  >
                    Court Booked - {el.place}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleJoinEvent(el.id)}>
                  <View
                    style={{
                      width: "30%",
                      backgroundColor: "black",
                      borderRadius: 10,
                      marginLeft: "65%",
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "IBM-Plex-Sans",
                        fontWeight: "700",
                        marginLeft: "12%",
                      }}
                    >
                      Join Now
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <PrimaryButton
                onPress={() => {
                  navigation.navigate("DetailsRoom");
                }}
                title="Join Event"
              /> */}
              </View>
            );
          })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
