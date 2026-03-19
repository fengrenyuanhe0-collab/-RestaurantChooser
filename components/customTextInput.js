import React from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, StyleSheet } from "react-native";

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  value,
  onChangeText,
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputStyle,
          error ? { borderColor: "red", borderWidth: 1 } : {},
        ]}
        maxLength={maxLength}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={value}
        {...props}
      />
      {error && (
        <Text style={{ color: "red", marginLeft: 10, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 8, borderRadius: 5 },
});

export default CustomTextInput;