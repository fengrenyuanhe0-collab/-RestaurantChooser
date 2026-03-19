// screens/people/listScreen.js
import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";

const ListScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);

  // 加载人员数据（逻辑和餐厅一致，只是 key 从 "restaurants" 改成 "people"）
  useEffect(() => {
    const fetchPeople = async () => {
      const data = await AsyncStorage.getItem("people");
      if (data) setPeople(JSON.parse(data));
    };
    fetchPeople();
  }, []);

  // 删除人员（逻辑和餐厅一致，只是数据集合是 people）
  const deletePerson = async (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const updated = people.filter((p) => p.key !== id);
          await AsyncStorage.setItem("people", JSON.stringify(updated));
          setPeople(updated);
          Toast.show({ type: "error", position: "bottom", text1: "Person deleted" });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomButton text="Add Person" onPress={() => navigation.navigate("PeopleAdd")} />
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            {/* 显示人员姓名（而非餐厅名称） */}
            <Text style={styles.text}>{`${item.firstName} ${item.lastName}`}</Text>
            <CustomButton
              text="Delete"
              onPress={() => deletePerson(item.key)}
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
  personItem: { flexDirection: "row", justifyContent: "space-between", padding: 10 },
  text: { fontSize: 18 },
  deleteButton: { backgroundColor: "red" },
});

export default ListScreen;