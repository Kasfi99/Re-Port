<<<<<<< HEAD
import "react-native-gesture-handler";
import { React, useCallback, useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
=======
import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/chatScreen";
<<<<<<< HEAD
import HomeScreen from "./screens/homeScreen";
import BoardingScreen from "./screens/boardingScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import WelcomeSport from "./screens/welcomeSportScreen";
import WelcomeProfile from "./screens/welcomeProfileScreen";
import WelcomeLevel from "./screens/welcomeLevelScreen";

const Stack = createStackNavigator();
=======
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

>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "IBM-Plex-Sans": require("./fonts/IBMPlexSans-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
<<<<<<< HEAD
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="WelcomeSport" component={WelcomeSport} />
          <Stack.Screen name="WelcomeProfile" component={WelcomeProfile} />
          <Stack.Screen name="WelcomeLevel" component={WelcomeLevel} />
          <Stack.Screen name="onBoarding" component={BoardingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;

    //         if (route.name === "Home") {
    //           iconName = focused
    //             ? "ios-information-circle"
    //             : "ios-information-circle-outline";
    //         } else if (route.name === "Settings") {
    //           iconName = focused ? "ios-list" : "ios-list-outline";
    //         }

    //         // You can return any component that you like here!
    //         return <Ionicons name={iconName} size={size} color={color} />;
    //       },
    //     })}
    //     tabBarOptions={{
    //       style: {
    //         backgroundColor: "#CEF249",
    //       },
    //     }}
    //   >
    //     <Tab.Screen name="Home" component={BoardingScreen} />
    //     <Tab.Screen name="Settings" component={ChatScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
=======
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
>>>>>>> 67cca3c5794afdf0edadae83bd2c570015028167
  );
}
