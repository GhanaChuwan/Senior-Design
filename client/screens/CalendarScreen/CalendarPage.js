//calendarPage

import React, { useState, useEffect, useContext, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";

import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
// import { Calendar } from 'react-native-calendars';
import { AuthContext } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CalendarPage({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [calanderVisible, setCalanderVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [zIndex, setZIndex] = useState(-1);
  const [name, setName] = useState();
  const [eventType, setEventType] = useState([
    "Group Meeting",
    "Client Meeting",
    "Office hour",
    "Discussions",
    "Normal Meeting",
  ]);
  const [note, setEventNote] = useState();
  const { events, createEvent, deleteEvent, retrieveEvents } =
    useContext(AuthContext);

  // set calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onDayPress = (day) => {
    setSelectedDate(new Date(day.timestamp));
  };

  //date picker
  const [displaymode, setMode] = useState("date");
  const [isDisplayDate, setShow] = useState(false);
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
  };

  const closeCalanderView = () => {
    setCalanderVisible(false);
  };
  const openCalanderView = () => {
    setCalanderVisible(true);
  };

  useEffect(() => {
    const parent = navigation.getParent();
    getEvents();
    parent?.setOptions({
      title: "Calendar",
      headerRight: () => (
        <View>
          <TouchableOpacity
            style={{
              marginRight: 2,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => showModal()}
          >
            <AntDesign name="form" style={styles.newTaskBtn} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [route.params]);

  const getEvents = async () => {
    try {
      await retrieveEvents();
    } catch (error) {
      console.log(error);
    }
  };
  const storeEvent = async () => {
    try {
      await createEvent({
        eventName: name,
        eventNote: note == "" ? " " : note,
        eventDate: date,
      });
      hideModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hideModal = () => {
    setVisible(false);
    setZIndex(-1);
  };
  const showModal = () => {
    setVisible(true);
    setZIndex(2);
    setName("");
    setEventNote("");
  };

  // date pick mode
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    setCalanderVisible(true);
  };

  // const retrieveEvents = async () => {
  //   try {
  //     await getAllEvents({
  //
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const alertUser = (item) => {
    Alert.alert(undefined, "are you sure you want to delete Event? ", [
      {
        text: "Yes",
        onPress: async () => {
          await deleteEvent({
            event: item,
          });
        },
      },
      { text: "Cancel" },
    ]);
  };

  const handleCalanderChange = (e) => {
    if (e.type === "dismissed") {
    } else if (e.type === "set") {
      setDate(new Date(e.nativeEvent.timestamp));
    }
    setCalanderVisible(false);
  };
  const displayDate = (dateObj) => {
    let date = dateObj.toString();

    let month = date[4] + date[5] + date[6];
    let day = date[8] + date[9];
    return month + " " + day;
  };
  const getDate = (date) => {
    let month = date[5] + date[6];
    let day = date[8] + date[9];

    switch (month) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
    }

    return (
      <View style={styles.date}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          zIndex: zIndex,
          width: "100%",
          height: "100%",
        }}
      >
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: "#fff",
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 20,
                top: -100,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    margin: 20,
                    textAlign: "center",
                    color: "#3B71F3",
                  }}
                >
                  Let's create an event
                </Text>

                <CustomInput
                  placeholder={"Event Name"}
                  onChangeText={(newText) => setName(newText)}
                />

                <TextInput
                  keyboardType="text"
                  placeholder="Event description"
                  placeholderTextColor="lightgray"
                  style={styles.input}
                  onChangeText={(text) => {
                    setEventNote(text);
                  }}
                />

                <SafeAreaView>
                  <View>
                    <CustomButton
                      onPress={displayDatepicker}
                      text="Show date picker!"
                    />
                  </View>

                  {calanderVisible && (
                    <DateTimePicker
                      mode="date"
                      value={date}
                      display="inline"
                      is24Hour={false}
                      onChange={handleCalanderChange}
                    />
                  )}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 10,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Date Selected: </Text>
                    <Text
                      style={{ fontSize: 20, textAlign: "right", width: 120 }}
                    >
                      {displayDate(date)}
                    </Text>
                  </View>
                </SafeAreaView>

                <CustomButton
                  text="Create Event"
                  onPress={() => {
                    storeEvent();
                  }}
                />
              </View>
            </Modal>
          </Portal>
        </Provider>
      </View>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => alertUser(item)}
            style={styles.event}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              {getDate(item.eventDate)}
              <View>
                <Text style={styles.name}>{item.eventName}</Text>
                <Text style={styles.note}>{item.eventNote}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const containerStyle = {
  backgroundColor: "white",
  marginHorizontal: 20,
  padding: 10,
  borderRadius: 20,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
  },
  body: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: "#3B71F3",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 80,
    backgroundColor: "transparent",
    marginHorizontal: 0,
  },
  event: {
    alignSelf: "center",
    width: "95%",
    backgroundColor: "orange",
    height: "auto",
    borderRadius: 11,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.30,
    elevation: 13,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  date: {
    width: 120,
    height: "auto",
    borderRightWidth: 2,
    borderRightColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  month: {
    fontSize: 30,
  },
  day: {
    fontSize: 25,
  },
  note: {
    fontSize: 18,
    width: 240,
    margin: 10,
  },
  name: {
    fontSize: 25,
    width: 250,
    margin: 5,
  },
  newTaskBtn: {
    height: 40,
    width: 40,
    fontSize: 30,
    margin: 10,
    left: 10,
    color: "#ffff",
  },
});
