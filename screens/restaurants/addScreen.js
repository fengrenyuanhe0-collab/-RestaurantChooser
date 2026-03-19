import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
// 导入新增的验证函数
import {
  validateAddress,
  validateName,
  validatePhone,
  validateWebsite,
  validateCuisine,
  validatePrice,
  validateRating,
  validateDelivery,
} from "./validators";
import Toast from "react-native-toast-message";

const AddScreen = ({ navigation }) => {
  // 优化状态初始化：key 移到保存时生成（避免初始化时无用生成），errors 初始化为空对象
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: "",
    price: "",
    rating: "",
    phone: "",
    address: "",
    website: "",
    delivery: "",
    errors: {},
  });

  const setField = (field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null }, // 输入时清空对应字段错误
    }));
  };

  // 优化验证逻辑：复用validators中的函数，移除硬编码
  const validateAllFields = () => {
    const { name, phone, address, website, cuisine, price, rating, delivery } = restaurant;
    const errors = {
      name: validateName(name),
      phone: validatePhone(phone),
      address: validateAddress(address),
      website: validateWebsite(website),
      cuisine: validateCuisine(cuisine),
      price: validatePrice(price),
      rating: validateRating(rating),
      delivery: validateDelivery(delivery),
    };
    setRestaurant((prev) => ({ ...prev, errors }));
    // 简化：判断是否有非null的错误
    return Object.values(errors).every((err) => err === null);
  };

  const saveRestaurant = async () => {
    const isFormValid = validateAllFields();
    if (!isFormValid) {
      // 找到第一个错误字段并提示
      const firstErrorKey = Object.keys(restaurant.errors).find(key => restaurant.errors[key]);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Validation Error",
        text2: restaurant.errors[firstErrorKey],
        visibilityTime: 3000,
      });
      return;
    }

    try {
      // 保存时生成key（避免初始化时生成无效key）
      const restaurantToSave = {
        ...restaurant,
        key: `r_${new Date().getTime()}`,
      };
      const existingData = await AsyncStorage.getItem("restaurants");
      const restaurants = existingData ? JSON.parse(existingData) : [];
      restaurants.push(restaurantToSave);
      await AsyncStorage.setItem("restaurants", JSON.stringify(restaurants));
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Restaurant saved successfully",
        visibilityTime: 2000,
      });
      // 保存后清空表单（可选，提升体验）
      setRestaurant({
        name: "",
        cuisine: "",
        price: "",
        rating: "",
        phone: "",
        address: "",
        website: "",
        delivery: "",
        errors: {},
      });
      navigation.navigate("RestaurantsList");
    } catch (error) {
      console.error("Failed to save restaurant:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error saving restaurant",
        text2: "Please try again",
        visibilityTime: 3000,
      });
    }
  };

  // 抽离Picker组件：减少重复代码
  const RenderPicker = ({ label, value, onValueChange, error, items }) => (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          prompt={label}
          selectedValue={value}
          onValueChange={onValueChange}
          style={[styles.picker, error ? styles.pickerError : {}]}
        >
          <Picker.Item label="" value="" />
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </>
  );

  return (
    <ScrollView>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          <CustomTextInput
            label="Name"
            maxLength={50}
            value={restaurant.name}
            onChangeText={(text) => setField("name", text)}
            error={restaurant.errors.name}
          />

          {/* 复用RenderPicker组件 - Cuisine */}
          <RenderPicker
            label="Cuisine"
            value={restaurant.cuisine}
            onValueChange={(val) => setField("cuisine", val)}
            error={restaurant.errors.cuisine}
            items={[
              { label: "American", value: "American" },
              { label: "Chinese", value: "Chinese" },
              { label: "Italian", value: "Italian" },
              { label: "Mexican", value: "Mexican" },
              { label: "Other", value: "Other" },
            ]}
          />

          {/* 复用RenderPicker组件 - Price */}
          <RenderPicker
            label="Price"
            value={restaurant.price}
            onValueChange={(val) => setField("price", val)}
            error={restaurant.errors.price}
            items={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ]}
          />

          {/* 复用RenderPicker组件 - Rating */}
          <RenderPicker
            label="Rating"
            value={restaurant.rating}
            onValueChange={(val) => setField("rating", val)}
            error={restaurant.errors.rating}
            items={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ]}
          />

          <CustomTextInput
            label="Phone"
            maxLength={20}
            value={restaurant.phone}
            onChangeText={(text) => setField("phone", text)}
            error={restaurant.errors.phone}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            label="Address"
            maxLength={50}
            value={restaurant.address}
            onChangeText={(text) => setField("address", text)}
            error={restaurant.errors.address}
          />

          <CustomTextInput
            label="Website"
            maxLength={50}
            value={restaurant.website}
            onChangeText={(text) => setField("website", text)}
            error={restaurant.errors.website}
            keyboardType="url"
            autoCapitalize="none"
          />

          {/* 复用RenderPicker组件 - Delivery */}
          <RenderPicker
            label="Delivery?"
            value={restaurant.delivery}
            onValueChange={(val) => setField("delivery", val)}
            error={restaurant.errors.delivery}
            items={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
          />
        </View>

        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
          />
          <CustomButton
            text="Save"
            onPress={saveRestaurant}
            buttonStyle={styles.saveButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: {
    marginLeft: 10,
  },
  // 抽离Picker公共样式
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
      android: {},
    }),
  },
  // 抽离错误样式
  pickerError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    marginBottom: 10,
  },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  cancelButton: { backgroundColor: "gray", width: "44%", marginRight: 8 }, // 增加间距
  saveButton: { backgroundColor: "green", width: "44%", marginLeft: 8 },
});

export default AddScreen;