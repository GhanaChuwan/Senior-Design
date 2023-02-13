import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";
import { StyleSheet, View, Title } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AppHeader = ({ navigation, menu, createFolder }) => {
  return (
    <Surface style={styles.header}>
      <View style={styles.view}>
        {menu && (
          <TouchableOpacity onPress={() => navigation}>
            <AntDesign name="menu" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.view}>
        <Title>Header Title</Title>
      </View>

      <View style={[styles.view, styles.rightView]}>
        {createFolder && (
          <TouchableOpacity onPress={() => navigation}>
            <AntDesign name="addfolder" />
          </TouchableOpacity>
        )}
      </View>
    </Surface>
  );
};
export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    blackgroundColor: "#fdf6ec",
  },
  view: {
    flex: 1,
    blackgroundColor: "yellow",
    margin: 10,
  },
  rightView: {
    justifyContent: "flex-end",
  },
});
