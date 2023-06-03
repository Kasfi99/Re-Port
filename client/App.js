import "react-native-gesture-handler";
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
import WelcomeSport from "./screens/welcomeSportScreen";
import WelcomeProfile from "./screens/welcomeProfileScreen";
import WelcomeLevel from "./screens/welcomeLevelScreen";

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
          <Stack.Screen name="WelcomeSport" component={WelcomeSport} />
          <Stack.Screen name="WelcomeProfile" component={WelcomeProfile} />
          <Stack.Screen name="WelcomeLevel" component={WelcomeLevel} />
          <Stack.Screen name="onBoarding" component={BoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
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
  );
}
