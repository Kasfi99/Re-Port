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

export default function UserProfile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [myUpcomingEvents, setUpcomingEvents] = useState([]);
  const [myPreviousEvents, setmyPreviousEvents] = useState([]);

  useEffect(() => {
    async function getMyEvents() {
      try {
        const response = await fetch(
          `https://a810-139-228-111-126.ngrok-free.app/event/myevents`,
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
        if (data.upcomingEvents) {
          setUpcomingEvents(data.upcomingEvents);
        } else if (data.previousEvent) {
          setmyPreviousEvents(data.previousEvent);
        }
        // console.log(data, "<<<");
      } catch (error) {
        console.log(error);
      }
    }
    getMyEvents();
  }, []);
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
              data={myUpcomingEvents}
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
              data={myPreviousEvents} //kirim beda data
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
