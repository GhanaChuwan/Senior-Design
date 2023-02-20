import React, { useContext } from "react";
import { useState, useEffect } from "react";
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

export default function Activity({ navigation, route }) {
  const { createActivity, getAllActivity, activities, deleteActivity } =
    useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState(3);
  const [zIndexCard, setZIndexCard] = useState(1);

  const { subjectId, activityId } = route.params;

  useEffect(() => {
    getAllActivity({ subjectId });
  }, [subjectId]);

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

  const activity = async () => {
    try {
      const { Activities, setActivities } = useContext(AuthContext);

      await createActivity({
        name: name,
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
      //   headerRight: () => (
      //     <View>
      //       <CreateActivity navigation={navigation} location={createActivity} />
      //     </View>
      //   ),
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
                <CustomInput
                  placeholder={"create a activity"}
                  onChangeText={(newText) => setName(newText)}
                  style={{ borderRadius: 30 }}
                />
                <Text style={styles.colorChooser}>Choose a color </Text>
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
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onLongPress={() => AlertUser(item)}
      onPress={() => {
        navigation.navigate("ActivitySession", { title: activity.name });
      }}
    >
      <Card
        style={{
          backgroundColor: `${activity.color}`,
          marginVertical: 5,
          marginHorizontal: 10,
          padding: 10,
        }}
      >
        <Card.Content style={styles.card}>
          <Title style={styles.title}>{activity.name}</Title>
          <Text style={styles.date}>
            {moment(activity.createdAt).fromNow()}
          </Text>
          <Title style={styles.totalTime}>0 Min ALL TIME</Title>
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
  },

  colorChooser: {
    fontSize: 20,
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    color: "gray",
  },
  colorContainer: {
    marginBottom: 20,
    height: 30,
    borderBottomWidth: 1,
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
  totalTime: {
    fontSize: 14,
    textAlign: "right",
    color: "white",
  },
});
