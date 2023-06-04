import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import COLORS from "../consts/colors";
import PrimaryButton from "../components/button";

export default function ThankYouScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          width: 350,
          height: 200,
          paddingVertical: 40,
          borderRadius: 10,
          backgroundColor: COLORS.primaryGreen,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          {" "}
          Woohoo!
        </Text>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          You have finished playing Badminton!
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 40,
          }}
        >
          <Text style={styles.textTitle}>10</Text>
          <Text style={styles.textTitle}>@HCK Badminton hall</Text>
          <Text style={styles.textTitle}>Jisoo_nim</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={styles.textTitleDesc}>Participants</Text>
          <Text style={styles.textTitleDesc}>Location</Text>
          <Text style={styles.textTitleDesc}>Created by</Text>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 500, textAlign: "center" }}>
          Please take a moment to review your teammates now
        </Text>
        <PrimaryButton title={"Review Teammates"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 13,
    fontWeight: "bold",
  },
  textTitleDesc: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.grey,
  },
});
