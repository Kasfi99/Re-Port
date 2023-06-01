import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import OnBoardingItem from "../components/onBoardingItem";
import Paginator from "../components/paginator";
import NextButton from "../components/NextButton";

const slides = [
  {
    id: "1",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/f27bec553efc12cc60baed89b8f2223e-1674661140708/ai-artists-2x.png",
    title: "Re:connect with others!",
    description:
      "Create and Explore events available near you! Join the games, have some fun and invite others in one app!",
  },
  {
    id: "2",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
    title: "Save Your Time",
    description:
      "Register a venue, pay the amount with others, and schedule your event all is one-click away! We make everything simple for you to have fun!",
  },
  {
    id: "3",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png",
    title: "Join Our Fun",
    description:
      "Choose either register or login, and let's have a good match together",
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

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
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
      <Paginator data={slides} scrollX={scrollX} />
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
