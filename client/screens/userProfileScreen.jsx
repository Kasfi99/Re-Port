import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../consts/colors";
import CardHome from "../components/cards";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalEdit from "../components/modalEdit";
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

const dummyData2 = [
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
];

export default function UserProfile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [myUpcomingEvents, setUpcomingEvents] = useState([]);
  const [myPreviousEvents, setmyPreviousEvents] = useState([]);

  const handleEdit = () => {
    console.log("bisa edit");
  };

  const handleLogOut = () => {
    console.log("bisa logout");
  };
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 0 }).current;

  const isLastSlide = currentIndex === dummyData.length - 1;

  useEffect(() => {
    async function myEvents() {
      try {
        const response = await fetch(
          `https://8530-139-228-111-126.ngrok-free.app/event/myevents`,
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
        // console.log(data.previousEvent, "******");
        if (data.upcomingEvents) {
          setUpcomingEvents(data.upcomingEvents);
        } else if (data.previousEvent) {
          setmyPreviousEvents(data.previousEvent);
        }
      } catch (error) {
        console.log(error);
      }
    }
    myEvents();
  }, []);

  // console.log(myUpcomingEvents, "<<<<<");

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#191B23",
            marginBottom: 30,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={{
                width: 65,
                height: 65,
                borderRadius: 50,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 30,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                marginTop: 45,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "bold",
                  color: COLORS.primaryGreen,
                }}
              >
                Jennie Kim
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primaryGreen,
                  fontFamily: "IBM-Plex-Sans",
                }}
              >
                Beginner
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  flexWrap: "wrap",
                  flex: 1,
                  marginTop: 15,
                  color: COLORS.white,
                  fontFamily: "IBM-Plex-Sans",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Hi, i’m friendly! Badminton and tennis lover!
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 20,
                width: "16%",
                marginLeft: "8%",
                marginTop: 20,
                borderColor: COLORS.primaryGreen,
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: "row",
                gap: 3,
              }}
            >
              <Ionicons
                name="star"
                color={"gold"}
                size={14}
                style={{
                  marginTop: 1,
                  marginLeft: 5,
                }}
              ></Ionicons>
              <Text
                style={{
                  fontFamily: "IBM-Plex-Sans",
                  color: "white",
                  position: "absolute",
                  right: 10,
                  bottom: 0.5,
                }}
              >
                4.7
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: "5%",
                marginLeft: "35%",
                // backgroundColor: "white",
                gap: 10,
              }}
            >
              <ModalEdit />

              <TouchableOpacity
                style={{
                  backgroundColor: "#D21312",
                  width: 70,
                  height: 25,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    paddingHorizontal: 10,
                    marginTop: 2,
                    color: "white",
                    fontWeight: "800",
                  }}
                  onPress={() => handleLogOut()}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View
                style={{
                  marginLeft: "-5%",
                  marginTop: "3%",
                }}
              >
                <Text>Badminton</Text>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                  Intermediate
                </Text>
              </View>
              <View
                style={{
                  borderColor: "white",
                  borderWidth: 10,
                  borderRadius: 100,
                  width: "30%",
                  height: 80,
                  marginLeft: "15%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 28,
                    fontWeight: "800",
                    marginLeft: 15,
                    marginBottom: -5,
                    marginTop: 2,
                  }}
                >
                  20
                </Text>
                <Text
                  style={{
                    fontFamily: "IBM-Plex-Sans",
                    fontSize: 12,
                    marginLeft: 13,
                  }}
                >
                  Scores
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginLeft: "8%",
              marginBottom: "-5%",
            }}
          >
            Current Activities
          </Text>
          <View>
            <FlatList
              data={dummyData}
              renderItem={({ item }) => (
                <CardHome item={item} horizontal={true} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // bounces={false}
              keyExtractor={(item) => item.id}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginLeft: "8%",
              marginBottom: "-5%",
            }}
          >
            Past Activities
          </Text>
          <View
            style={{
              marginBottom: 80,
            }}
          >
            <FlatList
              data={dummyData2} //kirim beda data
              renderItem={({ item }) => (
                <CardHome item={item} horizontal={true} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // bounces={false}
              keyExtractor={(item) => item.id}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: COLORS.primaryGreen,
    marginBottom: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
  },
  cardImage: {
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16,
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
});
