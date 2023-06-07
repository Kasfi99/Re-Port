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
  const [checkedItems, setCheckedItems] = useState(
    // Inisialisasi checkedItems dengan nilai awal false pada semua id
    data.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );

  const [teamData, setTeamData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersRating, setUsersRating] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // console.log(teamData, "<< Team Data");

  const handleSelectAll = () => {
    const newCheckedItems = {};
    if (Object.keys(checkedItems).length === teamData.length) {
      // Jika semua item sudah dipilih, maka uncheck semua
      teamData.forEach((item) => {
        newCheckedItems[item.id] = false;
      });
    } else {
      // Jika ada item yang belum dipilih, maka check semua
      teamData.forEach((item) => {
        newCheckedItems[item.id] = true;
      });
    }
    setCheckedItems(newCheckedItems);
  };

  const handleSelectItem = (id) => {
    // console.log(id, "cehclis");
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[id] = !newCheckedItems[id];
    setCheckedItems(newCheckedItems);
  };

  // const handleSubmit = () => {
  //   const selectedItems = teamData.filter((item) => checkedItems[item.id]);
  //   // console.log("Selected items:", selectedItems);

  //   const ratings = selectedItems.map((item) => ({
  //     memberId: item.id,
  //     rating: item.rating,
  //   }));
  //   console.log("Ratings:", ratings);

  //   const data = {
  //     attendees: selectedItems,
  //     ratings: ratings,
  //   };
  //   console.log("Data to be sent:", data);
  // };

  useEffect(() => {
    async function fetchByEvent() {
      // console.log("useEffect di Review pertama dijalankan");
      try {
        const dataString = await AsyncStorage.getItem("access_token");
        const access_token = JSON.parse(dataString);

        const emailString = await AsyncStorage.getItem("email");
        const email = JSON.parse(emailString);
        // console.log("useEffect pertama Masuk Ke Try");
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
          if (data.creator.email === email) {
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

  // console.log(teamData, "<<<DATA TEAM");
  const team = teamData.map((data) => {
    const user = { userId: data.user._id, rating: null };
    return user;
  });
  // setUsersRating(team);

  // console.log(team, "TEAM");
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
