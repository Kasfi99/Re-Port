// import "react-native-gesture-handler";
import { React, useCallback, useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/chatScreen";
import HomeScreen from "./screens/homeScreen";
import BoardingScreen from "./screens/boardingScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import WelcomeSport from "./screens/welcomeSportScreen";
import WelcomeProfile from "./screens/welcomeProfileScreen";
import WelcomeLevel from "./screens/welcomeLevelScreen";
import AddEventFormScreen from "./screens/addEventFormScreen";
import CalendarTest from "./screens/calendarText";
import DetailsRoom from "./screens/DetailsRoomScreen";
import UserProfile from "./screens/userProfileScreen";
import ThankYouScreen from "./screens/thankYouScreen";
import AdminReview from "./screens/reviewAdminScreen";
import EventRoom from "./screens/eventRoom";

const Stack = createStackNavigator();
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
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = "home";
                    } else if (route.name === "Chat") {
                      iconName = "chatbox";
                    } else if (route.name === "userProfile") {
                      iconName = "person-circle";
                    }

                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                })}
              >
                {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
                {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
                {/* <Tab.Screen name="Review" component={AdminReview} /> */}
                <Tab.Screen name="AddEvent" component={AddEventFormScreen} />

                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="userProfile" component={UserProfile} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="WelcomeSport" component={WelcomeSport} />
          <Stack.Screen name="WelcomeProfile" component={WelcomeProfile} />
          <Stack.Screen name="WelcomeLevel" component={WelcomeLevel} />
          <Stack.Screen name="onBoarding" component={BoardingScreen} />
          <Stack.Screen
            name="eventRoom"
            component={EventRoom}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
