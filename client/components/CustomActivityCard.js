import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";

export default function CustomActivityCard({
  navigation,
  createActivity,
  deleteActivity,
}) {
  const alertUser = () => {
    Alert.alert(undefined, "are you sure you want to delete activity? ", [
      {
        text: "Yes",
        onPress: () => {
          deleteActivity(createActivity);
        },
      },
      { text: "Cancel" },
    ]);
  };

  return (
    <TouchableOpacity
      onLongPress={alertUser}
      style={[styles.card, { backgroundColor: `${activity.color}` }]}
      // onPress={() => {
      //   navigation.navigate("CreateActivity", { title: createActivity.name });
      // }}
    >
      <View>
        <Card style={[styles.card, { backgroundColor: `${activity.color}` }]}>
          <Text style={title}>{createActivity.name}</Text>
        </Card>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    padding: 10,
    backgroundColor: "",
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    padding: 10,
    color: "white",
  },
});
