import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Rating } from "react-native-elements";
// import { AirbnbRating } from "@rneui/themed";
import COLORS from "../consts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../consts/ngrokUrl";
import RatingCustom from "../components/ratings";
import axios from "axios";

const data = [
  { id: 1, name: "Jennie Kim", rating: 0 },
  { id: 2, name: "Budi Bubur", rating: 0 },
  { id: 3, name: "Bob Smith", rating: 0 },
  { id: 4, name: "Alice Jones", rating: 0 },
  { id: 5, name: "Tom Brown", rating: 0 },
];

export default function AdminReview({ route }) {
  const { id } = route.params;
  const [dataReview, setDataReview] = useState({});
  const [teamData, setTeamData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [usersRating, setUsersRating] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchByEvent() {
      // console.log("useEffect di Review pertama dijalankan");
      try {
        const dataString = await AsyncStorage.getItem("access_token");
        const access_token = JSON.parse(dataString);

        const userString = await AsyncStorage.getItem("user");
        const userParsed = JSON.parse(userString);
        const userEmail = userParsed.email;

        // const emailString = await AsyncStorage.getItem("email");
        // const email = JSON.parse(emailString);
        const response = await fetch(`${baseUrl}/event/${id}`, {
          headers: {
            "Content-Type": "application/json",
            access_token: access_token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const data = await response.json();
        // console.log(data, " DATA DI HALAMAN REVIEW ADMIN <<<");
        setDataReview(data);

        if (data) {
          if (data.creator.email === userEmail) {
            setIsAdmin(true);
          }
        }
        setTeamData(data.participants);
      } catch (error) {
        console.error(error);
      }
    }
    fetchByEvent();
  }, []);
  // CLOSE FETCH EVENT

  const handleSelectItem = (id) => {
    const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newCheckedItems);
    sendChecklistData(id, newCheckedItems[id]);
  };

  const sendChecklistData = async (userId, status) => {
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);

      // const data = { userId, status, eventId: id };
      // console.log(data, "<<< SEND CHECLIST");
      const response = await axios({
        url: `${baseUrl}/user/${userId}`,
        method: "PATCH",
        headers: {
          access_token: token,
        },
        data: {
          id,
        },
      });
      console.log(response.data, "RESPONSE CHECKLIST");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = () => {
    const newCheckedItems = {};
    if (Object.keys(checkedItems).length === teamData.length) {
      teamData.forEach((item) => {
        newCheckedItems[item.user._id] = false;
      });
    } else {
      teamData.forEach((item) => {
        newCheckedItems[item.user._id] = true;
      });
    }
    setCheckedItems(newCheckedItems);
  };

  attendanceCompleted = async (id) => {
    // console.log("Rating is: " + id, rating);
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);

      const userString = await AsyncStorage.getItem("user");
      const userParsed = JSON.parse(userString);
      console.log(userParsed, "<< userParsedd");

      const newCheckedItems = { ...checkedItems };
      newCheckedItems[id] = !newCheckedItems[id];
      console.log(newCheckedItems, "dgudusuds");
      // const userEmail = userParsed.email;

      // const response = await axios({
      //   url: `${baseUrl}/rating`,
      //   method: "Patch",
      //   headers: {
      //     access_token: token,
      //   },
      //   data: {
      //     userId: id,
      //     rating: rating,
      //   },
      // });
      // console.log(response.data, "<<<<");
    } catch (error) {
      console.log(error);
    }
  };

  ratingCompleted = async (rating, id) => {
    // console.log("Rating is: " + id, rating);
    try {
      const dataString = await AsyncStorage.getItem("access_token");
      const token = JSON.parse(dataString);
      const response = await axios({
        url: `${baseUrl}/rating`,
        method: "Post",
        headers: {
          access_token: token,
        },
        data: {
          userId: id,
          rating: rating,
        },
      });
      // console.log(response.data, "<<<<");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isAdmin && (
          <View>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Who's Coming?</Text>
                <TouchableOpacity onPress={handleSelectAll}>
                  <Text style={styles.selectAllText}>
                    {Object.keys(checkedItems).length === teamData.length
                      ? "Unselect All"
                      : "Select All"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView>
              {teamData?.map((item) => (
                <View style={styles.item} key={item.id}>
                  <View>
                    <Text style={styles.itemText}>{item.user.name}</Text>
                  </View>

                  <Checkbox
                    status={
                      checkedItems[item.user._id] ? "checked" : "unchecked"
                    }
                    onPress={() => handleSelectItem(item.user._id)}
                    color={COLORS.primaryGreen}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ flex: 1, marginTop: 30 }}>
          <Text style={styles.headerText}>Review Your Teammates</Text>
          <ScrollView>
            {teamData?.map((item) => (
              <View style={styles.card} key={item.id}>
                <Text style={styles.cardTitle}>{item.user.name}</Text>

                <RatingCustom
                  ratingScore={item.user.rating}
                  handleChange={(rating) => {
                    ratingCompleted(rating, item.user._id);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectAllText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  card: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: 15,
    marginBottom: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
