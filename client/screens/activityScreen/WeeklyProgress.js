import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useContext } from "react";
import { BarChart } from "react-native-chart-kit";
import { AuthContext } from "../../context/AuthContext";
import formatTime from "../../utils/formateTime";

const WeeklyProgress = ({ navigation, route }) => {
  const { weeklySession, getWeeklyProgress } = useContext(AuthContext);

  useEffect(() => {
    getWeeklyProgress();
  }, []);

  // useEffect(() => {
  //   getAllActivity({ activityId });
  // }, [activityId]);

  useEffect(() => {
    //navigation.setOptions({ headerTitle: title });
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
      headerShown: true,
    });
  }, [route]);

  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data:[50, 70, 90, 40, 30, 20, 0]
        //data: weeklySession,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 10}
        height={320}
        chartConfig={{
          backgroundGradientFrom: "#3B71F3",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "red",
          backgroundGradientToOpacity: 1,
          color: (opacity) => `rgba(255, 255, 255,2)`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.7,
          useShadowColorFromDataset: false, // optional
        }}
        style={{ borderRadius: 10, alignSelf: "center" }}
      />
    </View>
  );
};

export default WeeklyProgress;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    marginTop: 25,
    // padding: 50,
    // flexDirection: "row" /,
    //justifyContent: "center",
  },
  titleText: {
    color: "#3B71F3",
    fontSize: 24,
    marginLeft: 100,
    marginBottom: 10,
  },
});
