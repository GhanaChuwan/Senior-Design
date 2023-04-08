import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from "react-native-paper";
import { AppState } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AuthContext } from "../../context/AuthContext";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function ActivityTime({ navigation, route }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const { activityId, title } = route.params;
  const {
    activitySession,
    addActivitySession,
    getAllActivitySession,
    updateChallenges,
  } = useContext(AuthContext);
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
  }, [title]);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        clearNotify();
      } else {
        stopStopwatch();
        schedulePushNotification();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
  const [zIndex, setZIndex] = useState(1);
  const startStopwatch = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const updateChallengeCard = async () => {
    await updateChallenges({
      activityType: activityId,
      activityTime: time,
    });
  };
  const stopStopwatch = () => {
    // const date = new Date(null);
    // date.setSeconds(time); // specify value for SECONDS here

    // console.log(result);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setModalVisible(true);
    showModal(true);
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
    marginHorizontal: 20,
    padding: 20,
    padding: 10,
    borderRadius: 20,
  };
  async function clearNotify() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async function schedulePushNotification() {
    await clearNotify();

    // const trigger = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const d = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey You need to go back to the app 📬",
        body: "You should be studying",
        data: { data: "goes here" },
      },
      trigger: { seconds: 3 },
      repeats: true,
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  // Using the function to add activity session

  return (
    <View style={styles.container}>
      {/* { <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      > } */}
      <View style={{ marginTop: 90 }}>
        <Text
          style={{
            fontSize: 60,
            fontWeight: "bold",
            alignItems: "center",
            // justifyContent: "center",
            marginLeft: 80,
            color: "#3B71F3",
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
          zIndex: zIndex,
        }}
      >
        {!isRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.circularButton, { marginLeft: 70 }]}
            onPress={startStopwatch}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.circularButton, { marginLeft: 70 }]}
            onPress={stopStopwatch}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.circularButton, { marginRight: 60 }]}
          onPress={resetStopwatch}
        >
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
              <CustomInput
                placeholder="Note"
                onChangeText={(e) => setNote(e)}
              />
              {/* <TextInput value={note} onChangeText={(e) => setNote(e)} /> */}
              <CustomButton
                text="Save"
                onPress={async () => {
                  await CreateactivitiesSession();
                  updateChallengeCard();

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
    width: 100,
    height: 100,
    // flex: 1,
    marginVertical: 10,
    backgroundColor: "#3B71F3",
    alignSelf: "flex-start",
    borderRadius: 20,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  circularButton: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
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
    color: "#3B71F3",
    marginLeft: 150,
  },
  modalTime: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 100,
    color: "#3B71F3",
  },
});
export default ActivityTime;
