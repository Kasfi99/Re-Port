import { View, Text, StyleSheet, ImageBackground } from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../components/button";
import { useNavigation } from "@react-navigation/native";

export default function CardHome() {
  const navigation = useNavigation();
  return (
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
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
