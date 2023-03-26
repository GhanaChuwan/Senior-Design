import React from "react";
import { useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Card, Title } from "react-native-paper";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import formatTime from "../../utils/formateTime";

export default function Session({ navigation, route }) {
  const { getAllActivitySession, activitysessions } = useContext(AuthContext);
  const { activityId, title } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
    });
    getAllActivitySession({ activityId });
  }, [activityId]);

  return (
    <View
      style={styles.container}
    // behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      {/* <Text style={styles.text}>Sessions</Text> */}
      <CustomButton
        style={{
          marginTop: 20,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
        type="LINKBUTTON"
        // style={{ marginTop: 20, alignItems: "flex-end" }}
        text="Add Timer"
        onPress={() =>
          navigation.navigate("ActivityTime", { activityId: activityId })
        }
      />
      <FlatList
        style={{ marginBottom: 10 }}
        data={activitysessions.activites}
        renderItem={({ item }) => (
          <CustomSessionsCard
            keyExtractor={(item) => item._id}
            activitySession={item}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
const CustomSessionsCard = ({ activitySession }) => {
  const timeStudied = formatTime(activitySession.time);

  return (
    <Card
      style={{
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: "#3B71F3",
      }}
    >
      <Card.Content style={styles.card}>
        <Text style={styles.texts}>{activitySession.note}</Text>
        <Text style={styles.date}>
          {/* {moment(activitySession.createdAt).fromNow()} */}
        </Text>
        <Title style={styles.timeSpent}>
          {`${timeStudied["hr"]} ${timeStudied["min"]} ${timeStudied["sec"]}`}
        </Title>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6ec",
    flexDirection: "column",
  },
  text: {
    fontSize: 20,
    textAlign: "left",
  },
  timeSpent: {
    fontSize: 14,
    textAlign: "right",
    color: "white",
  },
  card: {
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  date: {
    fontSize: 15,
    textAlign: "left",
    color: "white",
  },
  texts: {
    fontSize: 14,
    textAlign: "left",
    color: "white",
  },
});
