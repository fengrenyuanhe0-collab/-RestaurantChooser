import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./listScreen";
import AddScreen from "./addScreen";

const Stack = createStackNavigator();

const RestaurantsScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="RestaurantsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="RestaurantsList"
        component={ListScreen}
      />
      <Stack.Screen
        name="RestaurantsAdd"
        component={AddScreen}
      />
    </Stack.Navigator>
  );
};

export default RestaurantsScreen;
