import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function CreateActivity({ navigation, location }) {
  return (
    <TouchableOpacity style={styles.btn}>
      <View style={styles.btnContainer}>
        <AntDesign
          name="addfile"
          size={30}
          onPress={() => navigation.navigate(location)}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    fontSize: 90,
    color: "#3B71F3",
    borderRadius: 30,
    width: 45,
    marginBottom: 5,
    height: 45,
    shadowRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  btnContainer: {},
});
