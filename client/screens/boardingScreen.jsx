import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import OnBoardingItem from "../components/onBoardingItem";
import Paginator from "../components/paginator";
import NextButton from "../components/NextButton";
import images1 from "../assets/1.png";
import images2 from "../assets/2.png";
import images3 from "../assets/3.png";
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    id: "1",
    image: images1,
    title: "Re:connect with others!",
    description:
      "Create and Explore events available near you! Join the games, have some fun and invite others in one app!",
  },
  {
    id: "2",
    image: images2,
    title: "Save Your Time",
    description:
      "Register a venue, pay the amount with others, and schedule your event all is one-click away! We make everything simple for you to have fun!",
  },
  {
    id: "3",
    image: images3,
    title: "Join Our Fun",
    description: "Join the fun, and have a good match with those around you!",
  },
];

export default function OnBoardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const navigation = useNavigation();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const isLastSlide = currentIndex === slides.length - 1;
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <View>
          <FlatList
            data={slides}
            renderItem={({ item }) => <OnBoardingItem item={item} />}
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
        {isLastSlide && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Login")}
          >
            <View
              style={{
                backgroundColor: "#CEF249",
                width: "30%",
                height: "20%",
                borderRadius: 10,
                position: "relative",
                left: "35%",
                bottom: "100%",
              }}
            >
              <Text
                style={{
                  paddingLeft: "17%",
                  paddingTop: "5%",
                  fontFamily: "IBM-Plex-Sans",
                  fontWeight: "800", // Use a string value for fontWeight
                }}
              >
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View
          style={{
            position: "absolute",
            left: "38%",
            bottom: "0%",
          }}
        >
          <Paginator data={slides} scrollX={scrollX} />
        </View>
      </View>
      {/* <NextButton percentage={(currentIndex + 1) * (100 / slides.length)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
  },
});
