import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import Constants from "expo-constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomButton from "../../components/customButton";

const WhosGoingScreen = () => {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const storedPeople = await AsyncStorage.getItem("people");
        const parsedPeople = storedPeople ? JSON.parse(storedPeople) : [];
        setPeople(parsedPeople);
        setSelected(parsedPeople.map(() => false));
      } catch (error) {
        Alert.alert("Error", "Failed to load people data.");
      }
    };

    loadPeople();
  }, []);

  // Handle hardware back button on Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Confirm", "Do you want to go back?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: () => navigation.goBack(),
          },
        ]);
        return true; // prevent default behavior
      };

      const backHandlerSubscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandlerSubscription.remove();
    }, [navigation])
  );

  const toggleSelection = (index) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };

  const handleNext = () => {
    const selectedParticipants = people
      .map((person, index) =>
        selected[index] ? { ...person, vetoed: "no" } : null
      )
      .filter(Boolean);

    if (selectedParticipants.length === 0) {
      Alert.alert("No participants", "Please select at least one person.");
      return;
    }

    navigation.navigate("PreFiltersScreen", {
      participants: selectedParticipants,
    });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.whosGoingItemTouchable}
      onPress={() => toggleSelection(index)}
    >
      <Checkbox
        value={selected[index]}
        onValueChange={() => toggleSelection(index)}
        style={styles.whosGoingCheckbox}
      />
      <Text style={styles.whosGoingName}>
        {item.firstName} {item.lastName} ({item.relationship})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listScreenContainer}>
      <Text style={styles.whosGoingHeadline}>Who's Going?</Text>
      <FlatList
        style={{ width: "94%" }}
        data={people}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
      />
      <CustomButton text="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  listScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  whosGoingHeadline: {
    fontSize: 30,
  },
  whosGoingItemTouchable: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
  },
  whosGoingCheckbox: {},
  whosGoingName: {
    flex: 1,
  },
});

import { useFocusEffect } from "@react-navigation/native";

// 每次进入页面，重新加载人员数据
useFocusEffect(
  useCallback(() => {
    const loadPeople = async () => {
      const storedPeople = await AsyncStorage.getItem("people");
      const parsedPeople = storedPeople ? JSON.parse(storedPeople) : [];
      setPeople(parsedPeople);
      setSelected(parsedPeople.map(() => false));
    };
    loadPeople();
  }, [])
);

export default WhosGoingScreen;