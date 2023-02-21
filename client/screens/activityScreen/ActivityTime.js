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
  const { activitySession, addActivitySession } = useContext(AuthContext);
  const [note, setNote] = useState("");
  // const [newTime, setNewTime] = useState(2);

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
  const [zIndex, setZIndex] = useState(2);
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
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 60,
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 30,
          }}
        >
          {formatTime(time)}
        </Text>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonRest} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
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

      {/* <Stopwatch /> */}
    </View>
  );
}

// const Stopwatch = () => {
//   // const [time, setTime] = useState(0);
//   // const [isRunning, setIsRunning] = useState(false);
//   // const intervalRef = useRef(null);
//   // const [zIndex, setZIndex] = useState(2);
//   // const startStopwatch = () => {
//   //   setIsRunning(true);
//   //   intervalRef.current = setInterval(() => {
//   //     setTime((prevTime) => prevTime + 1);
//   //   }, 1000);
//   // };

//   // const stopStopwatch = () => {
//   //   // const date = new Date(null);
//   //   // date.setSeconds(time); // specify value for SECONDS here

//   //   // console.log(result);
//   //   setIsRunning(false);
//   //   clearInterval(intervalRef.current);
//   //   setModalVisible(true);
//   // };

//   // const resetStopwatch = () => {
//   //   setIsRunning(false);
//   //   clearInterval(intervalRef.current);
//   //   setTime(0);
//   // };

//   // const formatTime = (time) => {
//   //   const hours = Math.floor(time / 3600);
//   //   const minutes = Math.floor((time - hours * 3600) / 60);
//   //   const seconds = time % 60;
//   //   return `${hours < 10 ? "0" + hours : hours}:${
//   //     minutes < 10 ? "0" + minutes : minutes
//   //   }:${seconds < 10 ? "0" + seconds : seconds}`;
//   // };
//   // const [modalVisible, setModalVisible] = useState(false);
//   // const closeModal = () => {
//   //   setZIndex(1);
//   //   setModalVisible(false);
//   // };
//   // const showModal = () => {
//   //   setZIndex(-1);
//   //   setModalVisible(true);
//   // };
//   // const containerStyle = {
//   //   backgroundColor: "white",
//   //   // marginHorizontal: 20,
//   //   padding: 20,
//   //   // borderRadius: 20,
//   // };
//   return (
//   //   <View
//   //     style={{
//   //       position: "absolute",
//   //       height: "100%",
//   //       width: "100%",
//   //       zIndex: 1,
//   //     }}
//   //   >
//   //     <Text
//   //       style={{
//   //         fontSize: 60,
//   //         fontWeight: "bold",
//   //         alignItems: "center",
//   //         justifyContent: "center",
//   //         marginLeft: 30,
//   //       }}
//   //     >
//   //       {formatTime(time)}
//   //     </Text>
//   //     {!isRunning ? (
//   //       <TouchableOpacity style={styles.button} onPress={startStopwatch}>
//   //         <Text style={styles.buttonText}>Start</Text>
//   //       </TouchableOpacity>
//   //     ) : (
//   //       <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
//   //         <Text style={styles.buttonText}>Done</Text>
//   //       </TouchableOpacity>
//   //     )}
//   //     <TouchableOpacity style={styles.buttonRest} onPress={resetStopwatch}>
//   //       <Text style={styles.buttonText}>Reset</Text>
//   //     </TouchableOpacity>
//   //     <Provider>
//   //       <Portal>
//   //         <Modal
//   //           visible={modalVisible}
//   //           onDismiss={closeModal}
//   //           contentContainerStyle={containerStyle}
//   //         >
//   //           <Text style={styles.modalTitle}>Time</Text>
//   //           <Text style={styles.modalTime}>{formatTime(time)}</Text>
//   //           <CustomInput placeholder="Note" />
//   //           <CustomButton
//   //             text="Save"
//   //             onPress={() => navigation.navigate("ActivitySession")}
//   //           />
//   //         </Modal>
//   //       </Portal>
//   //     </Provider>
//   //   </View>
//   // );
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    marginLeft: 20,
  },
  time: {
    fontSize: 60,
    fontWeight: "bold",
  },
  button: {
    // width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3B71F3",
  },
  buttonRest: {
    // width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3B71F3",
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
    text: "center",
  },
  modalTime: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default ActivityTime;
