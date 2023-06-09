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
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../consts/ngrokUrl";

export default function CardHome({ filter, item, idEvent, horizontal }) {
  // console.log(idEvent, "ID DI USER PROFILE");
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState();
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  async function handleJoin(id) {
    console.log(id, "<<id Handle Join");
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);
      const response = await fetch(`${baseUrl}/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
      });
      const data = await response.json();
      console.log(data, "<< Handle Join");
      navigation.navigate("eventRoom", { id: id });
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   getData();
  // }, []);

  // async function getData() {
  //   try {
  //     const dataString = await AsyncStorage.getItem("access_token");
  //     const token = JSON.parse(dataString);
  //     setAccessToken(token);
  //     // Lakukan sesuatu menggunakan access_token
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const greenSlots = !item?.participant ? 0 : item?.participant.length;
  const remainingSlots = 8 - greenSlots;

  // FUNCTION VALIDATION UNTUK TRIGGER IS EVENT DONE
  // async function validateAndStartEvent(startDateTime, endDateTime, eventId) {
  //   // parsing data waktu dari string ke objek Date
  //   const eventData = {
  //     start: "2023-06-17T02:36:00.000Z",
  //     end: "2023-06-17T04:36:00.000Z",
  //   };
  //   const eventDataStart = new Date(eventData.start);
  //   const eventDataEnd = new Date(eventData.end);
  //   const givenStart = new Date(startDateTime);
  //   const givenEnd = new Date(endDateTime);

  //   // validasi apakah waktu yang diberikan sama dengan waktu pada data event
  //   if (
  //     givenStart.getTime() === eventDataStart.getTime() &&
  //     givenEnd.getTime() === eventDataEnd.getTime()
  //   ) {
  //     try {
  //       // jika validasi sukses, trigger server untuk mengubah status event menjadi 'on-going'
  //       const response = await axios.patch(`/api/event/${eventId}`);
  //       console.log("Status event berhasil diubah");
  //     } catch (error) {
  //       console.error("Terjadi kesalahan saat mengubah status event:", error);
  //     }
  //   } else {
  //     console.error("Waktu yang diberikan tidak sesuai dengan data event");
  //   }
  // }
  // console.log(events);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${baseUrl}/eventlist`);
        const data = await response.json(); // parsing respons JSON
        // console.log(data); // hasil respons JSON
        setEvents(data); // simpan data ke state events
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <View
        style={{
          width: horizontal ? 350 : "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        {events &&
          !horizontal &&
          events.map((el) => {
            // console.log(el._id, "<<<<");
            // const greenSlots = el.participant.length;
            // const remainingSlots = 8 - greenSlots;
            // console.log(el);
            return (
              <TouchableOpacity
                key={el._id}
                onPress={() => navigation.navigate("eventRoom", { id: el._id })}
              >
                <View
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
                      fontFamily: "IBM-Plex-Sans",
                      fontWeight: "600",
                      marginTop: 20,
                      marginLeft: 10,
                    }}
                  >
                    {el.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "IBM-Plex-Sans",
                      fontWeight: "700",
                      marginTop: 5,
                      marginLeft: 10,
                      width: "95%",
                    }}
                  >
                    {el.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  >
                    {/* <View style={{ flexDirection: "row" }}>
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
                    </View> */}
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
                      {/* {el.participant.length}/8 Playing */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "IBM-Plex-Sans",
                      }}
                    >
                      Court Price {el.courtPrice}
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
                  <TouchableOpacity onPress={() => handleJoin(el._id)}>
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
              </TouchableOpacity>
            );
          })}

        {/* {console.log(item, "iteeem")} */}
        {horizontal && item && (
          <TouchableOpacity
            key={item._id}
            onPress={() => navigation.navigate("eventRoom", { id: idEvent })}
          >
            <View
              // key={item.id}
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
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "600",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                {item.sport?.name} Meetup
              </Text>
              <Text
                style={{
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "700",
                  marginTop: 5,
                  marginLeft: 10,
                  width: "95%",
                }}
              >
                {item.creator?.name}
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
                  {greenSlots}/8 Playing
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "IBM-Plex-Sans",
                  }}
                >
                  {item.price} IDR/Person
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
                  Date : {item.time}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "IBM-Plex-Sans",
                    marginBottom: 5,
                  }}
                >
                  {item.status}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "IBM-Plex-Sans",
                  }}
                >
                  Court Booked - {item.place}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleJoinEvent(item.id)}>
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
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
