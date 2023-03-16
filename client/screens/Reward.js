import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
  Text,
  View,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function Reward({ navigation, route }) {
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      title: "Rewards", headerRight: () => (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginRight: 5, fontSize: 20, color: "white" }}>{streak}</Text>
          <FontAwesome5 name={"fire"} style={{ fontSize: 20, color: "red", marginVertical: 2, marginRight: 10 }} />
        </View>
      )
    });
    retrieveChallenges();
    retrieveDays();
    retrieveStreaks();
  }, [route.params]);
  const { days, challenges, streak, getDays, getStreak, getChallenges } = useContext(AuthContext);

  const retrieveStreaks = async () => {
    await (getStreak());
  }
  const retrieveDays = async () => {
    await (getDays());
  }
  const retrieveChallenges = async () => {
    await (getChallenges());
  }

  return (
    <View style={{ display: "flex", backgroundColor: "lightgray", flex: 1 }}>
      <View style={styles.weeklyStreaks}>

        <FlatList
          data={days}
          numColumns={7}
          renderItem={({ item }) => (
            <View style={[item.completed == true ? styles.completedDay : styles.day]}>
              <Text style={[item.completed == true ? styles.completed : styles.initial]}>{item.day}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.container}>

        <FlatList
          data={challenges}
          renderItem={({ item }) => (
            <View style={item.completed == true ? styles.completedCheck : styles.challengeCard} >
              <FontAwesome5 name={item.emblem} style={{ fontSize: 40, color: "black", marginVertical: 10 }} />
              <Text style={item.completed == true ? styles.completedChallengeDescription : styles.challengeDescription}>{item.description}</Text>
            </View>
          )}
        />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  completedCheck: {
    height: 100,
    backgroundColor: "green",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1

  },
  completedChallengeDescription: {
    fontSize: 22,
    paddingHorizontal: 30,
    color: "white"
  },
  checkbox: {
    fontSize: 40,
    color: "white"
  },
  challengeDescription: {
    fontSize: 22,
    paddingHorizontal: 30,
    color: "gray"
  },
  challengeCard: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1
  },
  weeklyStreaks: {
    height: 70,
    marginBottom: 15
  },
  completed: {
    fontSize: 22,
    color: "white"
  },
  completedDay: {
    width: 45,
    height: 45,
    backgroundColor: "orange",
    borderRadius: 50,
    marginHorizontal: 5,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 5,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontSize: 22,
    color: "black"
  },


});
