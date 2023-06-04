import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../consts/colors";
import CardHome from "../components/cards";

export default function UserProfile() {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <View
        style={{
          flex: 1,
          //   backgroundColor: "red",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={{ width: 100, height: 100, borderRadius: 50, marginRight: 20 }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            marginTop: 45,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Jennie Kim</Text>
          <Text style={{ fontSize: 16 }}>Beginner</Text>
          <Text
            style={{
              fontSize: 15,
              flexWrap: "wrap",
              flex: 1,
              marginTop: 15,
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
          flex: 1,
          //   backgroundColor: "green",
          //   flexDirection: "row",
          //   alignItems: "center",
        }}
      >
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text>Badminton</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Intermediate
                </Text>
              </View>
              <View style={{ marginLeft: 130 }}>
                <Text>Scores: </Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text>Tennis</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Beginner
                </Text>
              </View>
              <View style={{ marginLeft: 130 }}>
                <Text>Scores: </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}> Activities</Text>
        <ScrollView>
          <CardHome />
          <CardHome />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: COLORS.primaryGreen,
    marginBottom: 16,
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
