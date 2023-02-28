import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Card, Divider, List } from "react-native-paper";
export default function CreateMenu({ navigation, location, subjectId, title }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <List.Item
          title={<Text style={styles.titleText}>Activity</Text>}
          left={(props) => (
            <List.Icon {...props} icon="book-clock" color="#3B71F3" />
          )}
          onPress={() =>
            navigation.navigate("Activity", { subjectId: subjectId })
          }
        />
        <Divider style={{ backgroundColor: "#1e407c" }} />
        <List.Item
          title={<Text style={styles.titleText}>Grade</Text>}
          left={(props) => (
            <List.Icon {...props} icon="notebook-check" color="#3B71F3" />
          )}
          onPress={() =>
            navigation.navigate("Grades", { title: title, subjectId })
          }
        />
        <Divider style={{ backgroundColor: "#1e407c" }} />
        <List.Item
          title={<Text style={styles.titleText}>View Progress</Text>}
          left={(props) => (
            <List.Icon {...props} icon="progress-check" color="#3B71F3" />
          )}
          onPress={() =>
            navigation.navigate("WeeklyProgress", { title: title })
          }
        />
        <Divider style={{ backgroundColor: "#1e407c" }} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    // padding: 50,
    // flexDirection: "row",
    // justifyContent: "center",
  },
  titleText: {
    color: "#3B71F3",
    fontSize: 24,
  },
});
