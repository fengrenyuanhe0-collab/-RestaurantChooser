import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const PostChoiceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chosenRestaurant } = route.params;

  // 无选中餐厅时的提示
  if (!chosenRestaurant) {
    return (
      <View style={styles.postChoiceScreenContainer}>
        <Text style={styles.postChoiceHeadline}>No restaurant selected.</Text>
      </View>
    );
  }

  // 有选中餐厅时展示详情
  return (
    <View style={styles.postChoiceScreenContainer}>
      <View>
        <Text style={styles.postChoiceHeadline}>Enjoy your meal!</Text>
      </View>

      <View style={styles.postChoiceDetailsContainer}>
        {/* 餐厅名称 */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Name:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.name}
          </Text>
        </View>

        {/* 菜系 */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Cuisine:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.cuisine}
          </Text>
        </View>

        {/* 价格（$重复对应次数） */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Price:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"$".repeat(chosenRestaurant.price)}
          </Text>
        </View>

        {/* 评分（★重复对应次数） */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Rating:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"★".repeat(chosenRestaurant.rating)}
          </Text>
        </View>

        {/* 电话 */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Phone:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.phone}
          </Text>
        </View>

        {/* 地址 */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Address:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.address}
          </Text>
        </View>

        {/* 网址 */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Web Site:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.website}
          </Text>
        </View>

        {/* 配送（布尔值转Yes/No） */}
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Delivery:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.delivery ? "Yes" : "No"}
          </Text>
        </View>
      </View>

      {/* 返回决策初始页按钮 */}
      <View style={{ paddingTop: 80 }}>
        <Button
          title="All Done"
          onPress={() => navigation.navigate("DecisionTimeScreen")}
        />
      </View>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  postChoiceScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  postChoiceHeadline: {
    fontSize: 32,
    paddingBottom: 80,
  },
  postChoiceDetailsContainer: {
    borderWidth: 2,
    borderColor: "#000000",
    padding: 10,
    width: "96%",
  },
  postChoiceDetailsRowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 12,
  },
  postChoiceDetailsLabel: {
    width: 70,
    fontWeight: "bold",
    color: "#ff0000", // 红色标签
  },
  postChoiceDetailsValue: {
    width: 300,
  },
});

export default PostChoiceScreen;