import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, submitting, type = "PRIMARY" }) => {
  const backgroundColor = submitting ? "#7fa3fa" : "#3B71F3";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_LINKBUTTON: {},
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_LINKBUTTON: {
    color: "#3B71F3",
  },
});

export default CustomButton;
