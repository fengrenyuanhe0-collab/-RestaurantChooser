import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";

const ListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await AsyncStorage.getItem("restaurants");
      if (data) setRestaurants(JSON.parse(data));
    };
    fetchRestaurants();
  }, []);

  const deleteRestaurant = async (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const updated = restaurants.filter((r) => r.key !== id);
          await AsyncStorage.setItem("restaurants", JSON.stringify(updated));
          setRestaurants(updated);
          Toast.show({
            type: "error",
            position: "bottom",
            visibilityTime: 2000,
            text1: "Restaurant deleted",
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Restaurant"
        onPress={() => navigation.navigate("RestaurantsAdd")}
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.text}>{item.name}</Text>
            <CustomButton
              text="Delete"
              onPress={() => deleteRestaurant(item.key)}
              buttonStyle={styles.deleteButton}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  restaurantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: { fontSize: 18 },
  deleteButton: { backgroundColor: "red" },
});

export default ListScreen;