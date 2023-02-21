import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

const WeeklyProgress = ({ navigation, route }) => {
  const { title } = route.params;
  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
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
        data: [10, 20, 30, 40, 50, 60],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weekly Progress</Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#3B71F3",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#3B71F3",
          backgroundGradientToOpacity: 1,
          color: (opacity) => `rgba(255, 255, 255,1)`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
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
    // flexDirection: "row",
    // justifyContent: "center",
  },
  titleText: {
    color: "#3B71F3",
  },
});
