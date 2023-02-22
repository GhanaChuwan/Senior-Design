import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from "react-native-paper";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AuthContext } from "../../context/AuthContext";

function ActivityTime({ navigation, route }) {
  const { activityId, title } = route.params;
  const { activitySession, addActivitySession, getAllActivitySession } =
    useContext(AuthContext);
  const [note, setNote] = useState("");
  // const [newTime, setNewTime] = useState(2);

  useEffect(() => {
    getAllActivitySession({ activityId });
  }, [activityId]);

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
  }, []);

  const CreateactivitiesSession = async () => {
    try {
      await addActivitySession({
        time: time,
        note: note,
        activityId: activityId,
      });
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [zIndex, setZIndex] = useState(3);
  const startStopwatch = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopStopwatch = () => {
    // const date = new Date(null);
    // date.setSeconds(time); // specify value for SECONDS here

    // console.log(result);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setModalVisible(true);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setZIndex(1);
    setModalVisible(false);
  };
  const showModal = () => {
    setZIndex(-1);
    setModalVisible(true);
  };
  const containerStyle = {
    backgroundColor: "white",
    // marginHorizontal: 20,
    padding: 20,
    // borderRadius: 20,
  };

  // Using the function to add activity session

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      > */}
      <View style={{ marginTop: 90 }}>
        <Text
          style={{
            fontSize: 60,
            fontWeight: "bold",
            alignItems: "center",
            // justifyContent: "center",
            marginLeft: 60,
          }}
        >
          {formatTime(time)}
        </Text>
      </View>

      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

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
              visible={modalVisible}
              onDismiss={closeModal}
              contentContainerStyle={containerStyle}
            >
              <Text style={styles.modalTitle}>Time</Text>
              <Text style={styles.modalTime}>{formatTime(time)}</Text>
              {/* <CustomInput placeholder="Note" /> */}
              <TextInput value={note} onChangeText={(e) => setNote(e)} />
              <CustomButton
                text="Save"
                onPress={async () => {
                  await CreateactivitiesSession();
                  navigation.navigate("ActivitySession", {
                    activityId: activityId,
                    title: { title },
                  });
                }}
              />
            </Modal>
          </Portal>
        </Provider>
      </View>

      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  time: {
    fontSize: 60,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "#3B71F3",
    alignSelf: "flex-start",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 70,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignContent: "center",
  },
  modalTime: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    alignContent: "center",
  },
});
export default ActivityTime;
