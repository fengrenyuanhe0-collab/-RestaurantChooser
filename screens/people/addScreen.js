// screens/people/addScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import { validateFirstName, validateLastName, validateRelationship } from "./validators";
import Toast from "react-native-toast-message";

const AddScreen = ({ navigation }) => {
  // 人员数据模型（比餐厅简单）
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    key: `p_${new Date().getTime()}`,
    errors: {},
  });

  // 字段更新逻辑（和餐厅一致）
  const setField = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  // 校验逻辑（适配人员字段）
  const validateAllFields = () => {
    const { firstName, lastName, relationship } = person;
    const errors = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      relationship: validateRelationship(relationship),
    };
    setPerson((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  // 保存人员（逻辑和餐厅一致，只是数据 key 是 "people"）
  const savePerson = async () => {
    if (!validateAllFields()) {
      const firstErrorField = Object.keys(person.errors).find((key) => person.errors[key]);
      if (firstErrorField) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Validation Error",
          text2: person.errors[firstErrorField],
          visibilityTime: 3000,
        });
        return;
      }
    }
    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];
      people.push(person);
      await AsyncStorage.setItem("people", JSON.stringify(people));
      Toast.show({ type: "success", position: "bottom", text1: "Person saved successfully" });
      navigation.navigate("PeopleList");
    } catch (error) {
      console.error("Failed to save person:", error);
      Toast.show({ type: "error", position: "bottom", text1: "Error saving person" });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* 人员表单字段（比餐厅少） */}
          <CustomTextInput
            label="First Name"
            maxLength={50}
            value={person.firstName}
            onChangeText={(text) => setField("firstName", text)}
            error={person.errors.firstName}
          />
          <CustomTextInput
            label="Last Name"
            maxLength={50}
            value={person.lastName}
            onChangeText={(text) => setField("lastName", text)}
            error={person.errors.lastName}
          />

          <Text style={styles.fieldLabel}>Relationship</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={person.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={[styles.picker, person.errors.relationship ? { borderColor: "red" } : {}]}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Me" value="Me" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Friend" value="Friend" />
              <Picker.Item label="Coworker" value="Coworker" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {person.errors.relationship && (
            <Text style={{ color: "red", marginLeft: 10 }}>{person.errors.relationship}</Text>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton text="Cancel" onPress={() => navigation.goBack()} buttonStyle={styles.cancelButton} />
          <CustomButton text="Save" onPress={savePerson} buttonStyle={styles.saveButton} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // 样式和餐厅添加页类似，按需调整
  container: { flex: 1, alignItems: "center", paddingTop: 20, width: "100%" },
  formContainer: { width: "96%" },
  fieldLabel: { marginLeft: 10, marginTop: 10 },
  pickerContainer: { ...Platform.select({ ios: {}, android: { width: "96%", borderWidth: 2, borderColor: "#c0c0c0", marginLeft: 10, marginTop: 4 } }) },
  picker: { ...Platform.select({ ios: { width: "96%", borderWidth: 2, borderColor: "#c0c0c0", marginLeft: 10 }, android: {} }) },
  buttonsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  cancelButton: { backgroundColor: "gray", width: "44%" },
  saveButton: { backgroundColor: "green", width: "44%" },
});

export default AddScreen;