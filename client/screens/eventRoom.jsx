import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailsRoom from "./DetailsRoomScreen";
import ChatScreen from "./chatScreen";
import { View } from "react-native";
import AdminReview from "./reviewAdminScreen";
const Tab = createMaterialTopTabNavigator();

export default function EventRoom({ route }) {
  // console.log(route.params, "routee");
  const { id } = route.params;
  // console.log(event);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Details"
          component={DetailsRoom}
          initialParams={{ id }}
        />
        <Tab.Screen
          name="Discussion"
          component={ChatScreen}
          initialParams={{ id }}
        />
        {/* <Tab.Screen
          name="AdminReview"
          component={AdminReview}
          initialParams={{ id }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}
