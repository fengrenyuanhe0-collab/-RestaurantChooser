import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const DecisionsScreen = ({ navigation }) => {
  const handlePress = async () => {
    try {
      const people = await AsyncStorage.getItem("people");
      const restaurants = await AsyncStorage.getItem("restaurants");

      if (!people || JSON.parse(people).length === 0) {
        Alert.alert(
          "That ain't gonna work, chief",
          "You haven't added any people. You should probably do that first, no?",
          [{ text: "Ok" }],
          { cancelable: false }
        );
      } else if (!restaurants || JSON.parse(restaurants).length === 0) {
        Alert.alert(
          "That ain't gonna work, chief",
          "You haven't added any restaurants. You should probably do that first, no?",
          [{ text: "Ok" }],
          { cancelable: false }
        );
      } else {
        navigation.navigate("WhosGoingScreen");
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  return (
    <View style={styles.decisionTimeScreenContainer}>
      <TouchableOpacity
        style={styles.decisionTimeScreenTouchable}
        onPress={handlePress}
      >
        <Image source={require("../../assets/its-decision-time.android.png")} />
        <Text style={{ paddingTop: 20 }}>Click the food to get going</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  decisionTimeScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  decisionTimeScreenTouchable: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DecisionsScreen;