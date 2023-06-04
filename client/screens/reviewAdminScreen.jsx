import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Rating } from "react-native-elements";
import COLORS from "../consts/colors";

const data = [
  { id: 1, name: "Jennie Kim", rating: null },
  { id: 2, name: "Budi Bubur", rating: null },
  { id: 3, name: "Bob Smith", rating: null },
  { id: 4, name: "Alice Jones", rating: null },
  { id: 5, name: "Tom Brown", rating: null },
];

export default function AdminReview() {
  const [checkedItems, setCheckedItems] = useState({});
  const [teamData, setTeamData] = useState(data);

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
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[id] = !newCheckedItems[id];
    setCheckedItems(newCheckedItems);
  };

  const handleRatingChange = (id, rating) => {
    const newData = [...teamData];
    const index = newData.findIndex((item) => item.id === id);
    newData[index].rating = rating;
    setTeamData(newData);
  };

  const handleSubmit = () => {
    const selectedItems = teamData.filter((item) => checkedItems[item.id]);
    // console.log("Selected items:", selectedItems);

    const ratings = selectedItems.map((item) => ({
      memberId: item.id,
      rating: item.rating,
    }));
    // console.log("Ratings:", ratings);

    const data = {
      attendees: selectedItems,
      ratings: ratings,
    };
    console.log("Data to be sent:", data);

    // try {
    //   const response = await axios.post(
    //     "https://example.com/api/attendance",
    //     data
    //   );
    //   console.log("Server response:", response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <View style={styles.container}>
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
        <ScrollView>
          {teamData.map((item) => (
            <View style={styles.item} key={item.id}>
              <View>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>

              <Checkbox
                status={checkedItems[item.id] ? "checked" : "unchecked"}
                onPress={() => handleSelectItem(item.id)}
                color={COLORS.primaryGreen}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginTop: 30 }}>
        <Text style={styles.headerText}>Review Your Teammates</Text>
        <ScrollView>
          {teamData.map((item) => (
            <View style={styles.card} key={item.id}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Rating
                type="star"
                fractions={1}
                startingValue={item.rating}
                imageSize={30}
                onFinishRating={(rating) => handleRatingChange(item.id, rating)}
                containerStyle={{ backgroundColor: "transparent" }}
                style={{ backgroundColor: "transparent" }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: 40,
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
  },
  submitButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: 15,
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
