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

  // 合并所有 useFocusEffect 逻辑到一个钩子中（避免重复 + 确保在组件内）
  useFocusEffect(
    useCallback(() => {
      // 1. 重新加载人员数据（原末尾的逻辑）
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

      // 2. 处理安卓硬件返回键（原第40行的逻辑）
      const onBackPress = () => {
        Alert.alert("Confirm", "Do you want to go back?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: () => navigation.goBack(),
          },
        ]);
        return true; // 阻止默认返回行为
      };

      const backHandlerSubscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      
      // 清理函数：组件卸载/离开页面时执行
      return () => {
        backHandlerSubscription.remove(); // 移除返回键监听
      };
    }, [navigation]) // 依赖数组：navigation 变化时重新执行
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

export default WhosGoingScreen;