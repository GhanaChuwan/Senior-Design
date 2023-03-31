import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useContext } from "react";
import { BarChart } from "react-native-chart-kit";
import { AuthContext } from "../../context/AuthContext";
import formatTime from "../../utils/formateTime";

const WeeklyProgress = ({ navigation, route }) => {
  const { subjectId, activityId } = route.params;
  const { getAllActivitySession, activitysessions, getAllActivity } =
    useContext(AuthContext);

  useEffect(() => {
    getAllActivity({ subjectId });
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

  console.log(activitysessions.totalTime);

  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        // data: [`${activitysessions.totalTime}`],
        data: [10, 15, 32, 10, 20, 1],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weekly Progress</Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 10}
        height={320}
        chartConfig={{
          backgroundGradientFrom: "#3B71F3",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#3B71F3",
          backgroundGradientToOpacity: 1,
          color: (opacity) => `rgba(255, 255, 255,1)`,
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
    marginTop: 5,
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
