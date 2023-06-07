import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";

export default function RatingCustom({ ratingScore = 1, handleChange }) {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [ratings, setRatings] = useState(ratingScore);
  const star =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  const blankStar =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  useEffect(() => {
    handleChange(ratings);
  }, [ratings]);
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from(Array(maxRating).keys()).map((rating, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setRatings(index + 1);
            }}
          >
            <Image
              source={{ uri: index < ratings ? star : blankStar }}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
