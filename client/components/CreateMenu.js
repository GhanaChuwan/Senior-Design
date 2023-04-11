import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { Card, Divider, List } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
export default function CreateMenu({ navigation, location, subjectId, title }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <ActivitiesCard
          onPress={() =>
            navigation.navigate("Activity", { subjectId: subjectId })
          }
        />
        <GradesCard
          onPress={() =>
            navigation.navigate("Grades", { title: title, subjectId })
          }
        />
      </View>
      <WeeklyCard
        onPress={() => navigation.navigate("WeeklyProgress", { title: title })}
      />
      <View style={styles.picture}>
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../assets/Images/student.png")}
        />
      </View>
    </View>
  );
}
const ActivitiesCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.ReactangleCard}>
        <View style={styles.cardContent}>
          <FontAwesome5 name="tasks" style={styles.iconButton} />
          <Text style={styles.titleText}>Activities</Text>
        </View>
        {/* Your card content goes here */}
      </View>
    </TouchableOpacity>
  );
};
const GradesCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.ReactangleCard}>
        <View style={styles.cardContent}>
          <FontAwesome5 name="book-open" style={styles.iconButton} />
          <Text style={styles.titleText}>Grades</Text>
        </View>
        {/* Your card content goes here */}
      </View>
    </TouchableOpacity>
  );
};
const WeeklyCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.weeklyCardCustom}>
        <View style={styles.cardContent}>
          <FontAwesome5 name="chart-bar" style={styles.iconButton} />
          <Text style={styles.titleText}>Weekly Progress</Text>
        </View>
        {/* Your card content goes here */}
      </View>
    </TouchableOpacity>
  );
};
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  ReactangleCard: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 30,
    height: 200,
    width: "100%", // Set width to 48% to allow for spacing between cards
    marginHorizontal: 1,
  },
  weeklyCardCustom: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    height: 200,
    marginHorizontal: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    fontSize: 90,
    margin: 10,
    color: "#3B71F3",
  },
});
