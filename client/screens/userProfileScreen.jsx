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
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../consts/colors";
import CardHome from "../components/cards";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalEdit from "../components/modalEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../consts/ngrokUrl";

export default function UserProfile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [myUpcomingEvents, setUpcomingEvents] = useState([]);
  const [myPreviousEvents, setmyPreviousEvents] = useState([]);
  const [profile, setMyProfile] = useState();

  useEffect(() => {
    async function getMyEvents() {
      try {
        const dataString = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(dataString);
        // setAccessToken(token);

        const emailString = await AsyncStorage.getItem("email");
        const email = JSON.parse(emailString);
        // setCurrentUserEmail(email);

        const response = await fetch(`${baseUrl}/event/myevents`, {
          headers: {
            "Content-Type": "application/json",
            access_token: token,

            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const data = await response.json();
        // console.log(typeof data);
        if (data.upcomingEvents) {
          console.log("MASHOOOk");
          setUpcomingEvents(data.upcomingEvents);
        } else if (data.previousEvent) {
          setmyPreviousEvents(data.previousEvent);
        }
        // console.log(data.upcomingEvents, "<<<");
      } catch (error) {
        console.log(error);
      }
    }
    getMyEvents();
  }, []);

  // console.log(myUpcomingEvents, "MY Upcoming");
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

  const getImage = async () => {
    try {
      const dataString = await AsyncStorage.getItem("profile_picture");
      const profPict = JSON.parse(dataString);
      // console.log(profPict, "<<<<<");

      setImage(<Image source={{ uri: profPict }} style={styles.icon} />);
    } catch (error) {
      console.log("failed to retrieve data : " + error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

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
            {image ? (
              image
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={styles.icon}
              />
            )}
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
            {/* {console.log(myUpcomingEvents, "<<<")} */}
            <FlatList
              data={myUpcomingEvents}
              renderItem={({ item }) => (
                <CardHome
                  key={item.id}
                  item={item}
                  idEvent={item._id}
                  horizontal={true}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // bounces={false}
              keyExtractor={(item) => {
                // console.log(item._id, "key");
                return item._id;
              }}
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
                <CardHome
                  key={item.id}
                  item={item}
                  idEvent={item._id}
                  horizontal={true}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
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
  icon: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

/*
---------------Important Note--------
- Untuk melakukan pengetasan pick image, silahkan download dulu sebuah gambar
  di ponsel kalian entah melalui google chrome dan semacamnya
- Ketika melakukan pick image dan ternyata gambarnya belum keganti, coba pick image sekali lagi, seharusnya berganti.

*/
