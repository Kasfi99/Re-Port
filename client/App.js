import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./screens/chatScreen";
import AddEventFormScreen from "./screens/addEventFormScreen";
import CalendarTest from "./screens/calendarText";
import HomeScreen from "./screens/homeScreen";
import DetailsRoom from "./screens/DetailsRoomScreen";
import UserProfile from "./screens/userProfileScreen";
import ThankYouScreen from "./screens/thankYouScreen";
import AdminReview from "./screens/reviewAdminScreen";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="addEvent" component={AddEventFormScreen} />
          <Tab.Screen name="chatScreen" component={ChatScreen} />
          {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
          <Tab.Screen name="UserProfile" component={UserProfile} />
          {/* <Tab.Screen name="ThankYou" component={ThankYouScreen} /> */}
          {/* <Tab.Screen name="AdminReview" component={AdminReview} /> */}
          <Tab.Screen name="DetailsRoom" component={DetailsRoom} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
