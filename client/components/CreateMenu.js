import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Divider, List } from "react-native-paper";
export default function CreateMenu({ navigation, location, subjectId, title }) {
  return (
    <View>
      <TouchableOpacity>
        <List.Item
          title="Activity"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() =>
            navigation.navigate("CreateActivity", { subjectId: subjectId })
          }
        />
        <Divider />
        <List.Item
          title="Grade"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() => navigation.navigate("Grades", { title: title })}
        />
        <Divider />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
});
