import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "../screens/people/peopleScreen";
import DecisionScreen from "../screens/decision/decisionScreenNavigation";
import RestaurantsScreen from "../screens/restaurants/restaurantsScreen";
import { Image, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const platformOS = Platform.OS.toLowerCase();
const Tab = createMaterialTopTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Restaurants"
        tabBarPosition="top"
        screenOptions={{
          animationEnabled: true,
          swipeEnabled: true,
          lazy: true,
          tabBarShowIcon: true,
          tabBarInactiveTintColor: "#555555",
          tabBarActiveTintColor: "#ff0000",
          tabBarStyle: {
            paddingTop: Constants.statusBarHeight,
          },
        }}
      >
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/icon-people.png")}
                style={{ width: 32, height: 32, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Decision"
          component={DecisionScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/icon-decision.png")}
                style={{ width: 32, height: 32, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/icon-restaurants.png")}
                style={{ width: 32, height: 32, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}