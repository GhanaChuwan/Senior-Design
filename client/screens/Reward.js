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
      title: "Challenges",
      headerRight: () => (
        <View style={{ display: "flex", flexDirection: "row" }}>
          {/* <Text style={{ marginRight: 5, fontSize: 20, color: "white" }}>{streak}</Text>
          <FontAwesome5 name={"fire"} style={{ fontSize: 20, color: "red", marginVertical: 2, marginRight: 10 }} /> */}
        </View>
      ),
    });
    retrieveChallenges();
    //retrieveDays();
    //retrieveStreaks();
  }, [route.params]);
  const { days, challenges, streak, getDays, getStreak, getChallenges } =
    useContext(AuthContext);

  // const retrieveStreaks = async () => {
  //   await (getStreak());
  // }
  // const retrieveDays = async () => {
  //   await (getDays());
  // }
  const retrieveChallenges = async () => {
    await getChallenges();
  };

  const calcuatedBackground = ({ current, max }) => {
    const per = current / max;
    if (per < 0.1) {
      return "0%";
    }

    return per * 100 + 1 + "%";
  };
  const getTime = (currentAmount, totalAmount) => {
    let secondsRemaining = totalAmount - currentAmount;
    if (secondsRemaining <= 0) {
      return "challenge completed";
    } else {
      let hours = Math.floor(secondsRemaining / 3600);
      let minutes = Math.floor((secondsRemaining % 3600) / 60);
      if (minutes == 0) return `${hours} hours remaining`;
      else return `${hours} hours and ${minutes} minutes remaining`;
    }
  };

  return (
    <View style={{ display: "flex", backgroundColor: "#fdf6ec", flex: 1,alignItems:'center' }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Complete challenges by the end of each week
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={challenges}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View
              style={
                item.completed == true
                  ? styles.completedCheck
                  : styles.challengeCard
              }
            >
              {Math.floor(item.currentAmount) > Math.floor(item.totalAmount) ? (
                <></>
              ) : (
                <View
                  style={{
                    backgroundColor: "#50C878",
                    height: 105,
                    width: calcuatedBackground({
                      current: Math.floor(item.currentAmount),
                      max: Math.floor(item.totalAmount),
                    }),
                    position: "absolute",
                    top: 0,
                    zIndex: 0,

                        shadowColor: "green",
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 10,
                      elevation: 13,



                  }}
                />
              )}

              <FontAwesome5
                name={item.emblem}
                style={{ fontSize: 25, color: "brown", marginVertical: 10 }}
              />

              <View style={styles.badgeContainer}>
                <Text style={{ marginTop: 12 }}> {item.badges} </Text>
                <FontAwesome5
                  name="ribbon"
                  style={{ fontSize: 20, color: "orange", marginVertical: 10 }}
                />
              </View>
              <View>
                <Text
                  style={
                    item.completed == true
                      ? styles.completedChallengeDescription
                      : styles.challengeDescription
                  }
                >
                  {item.description}
                </Text>
                <Text
                  style={
                    item.completed == true ? styles.completedTime : styles.time
                  }
                >
                  {getTime(item.currentAmount, item.totalAmount)}
                </Text>
              </View>
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
    backgroundColor: "#50C878",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 13,

    // overflow: "hidden",
    
  },
  completedChallengeDescription: {
    fontSize: 22,
    paddingHorizontal: 30,
    color: "white",
    
  },
  checkbox: {
    fontSize: 40,
    color: "white",
  },
  challengeDescription: {
    fontSize: 22,
    paddingHorizontal: 30,
    color: "gray",
  },
  challengeCard: {
    height: 105,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    // shadowColor: "gray",
    // shadowOffset: { width: 0, height: 1 },

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 13,

  },
  weeklyStreaks: {
    height: 70,
    marginBottom: 15,
  },
  completed: {
    fontSize: 22,
    color: "white",
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
    color: "black",
  },
  header: {
    textAlign: "center",
    margin: 10,
    fontSize: 23,
    color: "#ffff",
  },
  time: {
    fontSize: 15,
    // margin: 5,
    // left: 160
    position: "absolute",
    top: 55,
    color: "gray",
    width: 250,
    left: 40,
  },
  completedTime: {
    fontSize: 15,
    // margin: 5,
    // left: 160
    position: "absolute",
    left: 160,
    top: 55,
    color: "white",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 60,
    left: 10,

  },
  headerContainer: {
    backgroundColor: "#50C878",
    width: 390,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent:'center',
    borderRadius: 11,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 13,
  },
  container: {},
});
