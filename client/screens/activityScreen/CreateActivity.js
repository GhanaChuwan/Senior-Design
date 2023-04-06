import React, { useContext, useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  title,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import ColorPicker from "react-native-wheel-color-picker";
import CreateActivity from "../../components/CreateActivity";
import { Card } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";
import formatTime from "../../utils/formateTime";

export default function Activity({ navigation, route }) {
  const {
    createActivity,
    getAllActivity,
    activities,
    deleteActivity,
    getAllActivitySession,
    activitysession,
  } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState(3);
  const [zIndexCard, setZIndexCard] = useState(1);
  const { subjectId, activityId } = route.params;
  const [activityTypes, setActivityTypes] = useState([
    "reading",
    "reviewing notes",
    "answering questions",
    "quizzing",
    "practice exams",
    "complete ATl modules",
    "complete EAQ questions",
    "complete PREP U questions",
    "study with a friend",
    "go to tutoring",
    "other",
  ]);

  useEffect(() => {
    getAllActivity({ subjectId });
  }, [activitysession]);

  // useEffect(() => {
  //   getAllActivity({ subjectId });
  // }, []);

  useEffect(() => {
    getAllActivitySession({ activityId });
  }, []);

  const showModal = () => {
    setZIndex(1);
    setZIndexCard(-1);
    setVisible(true);
  };
  const hideModal = () => {
    setZIndex(-1);
    setZIndexCard(1);
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
  };
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selected, setSelected] = useState();

  const activity = async () => {
    try {
      await createActivity({
        name: selected,
        color: selectedColor,
        subjectId: subjectId,
      });
      hideModal();
    } catch (error) {
      console.log(error.message);
    }
  };

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

  return (
    <View
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View>
                <Text style={styles.header}>Let's create a Activity</Text>

                <View style={styles.dropDown}>
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={activityTypes}
                    placeholder="Select activity"
                    boxStyles={{ backgroundColor: "#3B71F3" }}
                    inputStyles={{ color: "#fff" }}
                    disabledTextStyles={{ color: "#fff" }}
                    dropdownStyles={{ backgroundColor: "#3B71F3" }}
                    dropdownTextStyles={{ color: "#fff" }}
                    save="value"
                  />
                </View>
                <Text style={styles.colorChooser}>Select a color </Text>
                <View style={styles.colorContainer}>
                  <ColorPicker
                    // ref={r => {  }}
                    color={selectedColor}
                    swatchesOnly={true}
                    onColorChange={(color) => setSelectedColor(color)}
                    thumbSize={40}
                    noSnap={true}
                    sliderSize={40}
                    palette={[
                      "#888888",
                      "#ed1c24",
                      "#d11cd5",
                      "#1633e6",
                      "#00aeef",
                      "#00c85d",
                      "#57ff0a",
                      "#fdb833",
                      "#f26522",
                    ]}
                    // Snap={true}
                    row={false}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 30,
                    backgroundColor: `${selectedColor}`,
                    borderRadius: 5,
                  }}
                ></View>
                <CustomButton text="Create Activity" onPress={activity} />
              </View>
            </Modal>
          </Portal>
        </Provider>
      </View>

      <Button
        style={{ marginTop: 20, alignItems: "flex-end" }}
        onPress={showModal}
      >
        Create Activity +
      </Button>

      <FlatList
        style={{ marginBottom: 10, zIndex: zIndexCard }}
        data={activities}
        renderItem={({ item }) => (
          <CustomActivityCard
            navigation={navigation}
            keyExtractor={(item) => item._id}
            activity={item}
            activitysession={activitysession}
            subjectId={subjectId}
            deleteActivity={deleteActivity}
          />
        )}
      />
    </View>
  );
}

const CustomActivityCard = ({
  activity,
  deleteActivity,
  navigation,
  route,
  subjectId,
  item,
  zIndexCard,
  activitysession,
  activityId,
}) => {
  const AlertUser = () => {
    Alert.alert(undefined, "are you sure you want to delete activity", [
      {
        text: "Yes",
        onPress: async (name) => {
          console.log("deleting activity");

          await deleteActivity({
            subjectId: subjectId,
            activityId: activity._id,
          });
        },
      },
      { text: "Cancel" },
    ]);
  };

  const timeStudied = formatTime(activity.totalTime);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onLongPress={() => AlertUser(item)}
      // onPress={() => {
      //   navigation.navigate("ActivityTime", { activityId: activityId });
      // }}
      onPress={() => {
        navigation.navigate("ActivitySession", {
          title: activity.name,
          activityId: activity._id,
        });
      }}
    >
      <Card
        style={{
          backgroundColor: `${activity.color}`,
          marginVertical: 1,
          marginHorizontal: 10,
          padding: 1,
        }}
      >
        <Card.Content style={styles.card}>
          <Title style={styles.title}>{activity.name}</Title>
          <Text style={styles.date}>
            {moment(activity.createdAt).fromNow()}
          </Text>
          <Title
            style={styles.totaltime}
          >{`${timeStudied["hr"]} ${timeStudied["min"]} ${timeStudied["sec"]}`}</Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    flexDirection: "column",
  },
  container1: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    margin: 20,
    textAlign: "center",
    color: "#3B71F3",
  },

  colorChooser: {
    fontSize: 20,
    // borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    color: "#3B71F3",
  },
  colorContainer: {
    marginBottom: 20,
    height: 30,
    // borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
  },
  card: {
    justifyContent: "center",
    height: 80,
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
  totaltime: {
    fontSize: 20,
    textAlign: "right",
    color: "white",
  },
  dropDown: {
    marginVertical: 10,
    borderRadius: 10,
  },
});
