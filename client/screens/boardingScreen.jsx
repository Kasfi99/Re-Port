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

export default function onBoardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

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
            onPress={() => navigation.navigate("Info")}
          >
            <View
              style={{
                backgroundColor: "#CEF249",
                width: 100,
                height: "20%",
                borderRadius: 10,
                position: "relative",
                left: "37%",
                bottom: "100%",
              }}
            >
              <Text
                style={{
                  paddingLeft: "15%",
                  paddingTop: "5%",
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
