import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
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
          right={(props) => (
            <List.Icon {...props} icon="chevron-double-right" color="#3B71F3" />
          )}
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
          right={(props) => (
            <List.Icon {...props} icon="chevron-double-right" color="#3B71F3" />
          )}
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
          right={(props) => (
            <List.Icon {...props} icon="chevron-double-right" color="#3B71F3" />
          )}
        />
        <Divider style={{ backgroundColor: "#1e407c" }} />
      </TouchableOpacity>
      <View style={styles.picture}>
        <Image
          style={{ width: 500, height: 500 }}
          source={require("../assets/Images/student.png")}
        />
      </View>
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
  picture: {
    flex: 1,
    alignSelf: "center",
    marginRight: 20,
  },
});
