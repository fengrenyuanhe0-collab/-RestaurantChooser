// screens/people/addScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
// 保留原有校验导入，若validator文件未实现空值校验，下方会兜底
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
  // 新增：防重复提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 字段更新逻辑（优化：自动去除首尾空格，避免纯空格提交）
  const setField = (field, value) => {
    // 对输入类字段自动去空格，Picker字段（relationship）保留原始值
    const processedValue = ["firstName", "lastName"].includes(field) ? value.trim() : value;
    setPerson((prev) => ({
      ...prev,
      [field]: processedValue,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  // 校验逻辑（强化：兜底空值校验，避免validator文件失效）
  const validateAllFields = () => {
    const { firstName, lastName, relationship } = person;
    const errors = {};

    // 1. 兜底空值校验（优先于外部validator，确保空值必拦截）
    if (!firstName) {
      errors.firstName = "First Name cannot be empty!";
    } else {
      // 调用外部校验（比如格式/长度）
      errors.firstName = validateFirstName(firstName) || null;
    }

    if (!lastName) {
      errors.lastName = "Last Name cannot be empty!";
    } else {
      errors.lastName = validateLastName(lastName) || null;
    }

    if (!relationship) {
      errors.relationship = "Relationship must be selected!";
    } else {
      errors.relationship = validateRelationship(relationship) || null;
    }

    setPerson((prev) => ({ ...prev, errors }));
    // 校验通过：所有错误为null
    return !Object.values(errors).some((error) => error !== null);
  };

  // 保存人员（优化：防重复提交 + 数据去重）
  const savePerson = async () => {
    // 拦截重复提交
    if (isSubmitting) return;

    // 先执行校验
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
      }
      return;
    }

    try {
      setIsSubmitting(true); // 标记提交中

      // 1. 读取已有人员数据
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];

      // 2. 新增：重复数据校验（按 名+姓+关系 去重）
      const isDuplicate = people.some(
        p => p.firstName === person.firstName && 
             p.lastName === person.lastName && 
             p.relationship === person.relationship
      );
      if (isDuplicate) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Duplicate Person",
          text2: "This person (First Name + Last Name + Relationship) already exists!",
          visibilityTime: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      // 3. 保存新人员
      people.push(person);
      await AsyncStorage.setItem("people", JSON.stringify(people));
      
      Toast.show({ 
        type: "success", 
        position: "bottom", 
        text1: "Success",
        text2: "Person saved successfully" 
      });
      navigation.navigate("PeopleList");

    } catch (error) {
      console.error("Failed to save person:", error);
      Toast.show({ 
        type: "error", 
        position: "bottom", 
        text1: "Error",
        text2: "Failed to save person, please try again" 
      });
    } finally {
      setIsSubmitting(false); // 恢复提交状态
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* 人员表单字段（保留原有结构，优化体验） */}
          <CustomTextInput
            label="First Name"
            maxLength={50}
            value={person.firstName}
            onChangeText={(text) => setField("firstName", text)}
            error={person.errors.firstName}
            placeholder="Enter first name (required)" // 新增：提示必填
          />
          <CustomTextInput
            label="Last Name"
            maxLength={50}
            value={person.lastName}
            onChangeText={(text) => setField("lastName", text)}
            error={person.errors.lastName}
            placeholder="Enter last name (required)" // 新增：提示必填
          />

          <Text style={styles.fieldLabel}>Relationship (required)</Text> {/* 新增：标记必填 */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={person.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={[styles.picker, person.errors.relationship ? { borderColor: "red" } : {}]}
              enabled={!isSubmitting} // 提交中禁用Picker
            >
              <Picker.Item label="Select a relationship" value="" /> {/* 优化：占位提示更清晰 */}
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
          <CustomButton 
            text="Cancel" 
            onPress={() => navigation.goBack()} 
            buttonStyle={styles.cancelButton}
            disabled={isSubmitting} // 提交中禁用取消（可选，也可保留启用）
          />
          <CustomButton 
            text={isSubmitting ? "Saving..." : "Save"} // 提交中按钮文字变化
            onPress={savePerson} 
            buttonStyle={styles.saveButton}
            disabled={isSubmitting} // 提交中禁用保存，防重复点击
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // 保留原有样式，无修改
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