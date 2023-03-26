import React, {useState, useEffect, useContext, useRef} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert} from "react-native";

import { Modal, Portal, Provider, TextInput, Button, FlatList} from "react-native-paper";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import {SelectList} from "react-native-dropdown-select-list";
import { LocaleConfig } from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import {AuthContext} from "../../context/AuthContext";

import DateTimePicker from '@react-native-community/datetimepicker';



export default function CalendarPage({ navigation, route }) {

  const [visible, setVisible] = useState(false);
  const datePickerRef = useRef()
  const [date, setDate] = useState(new Date())
  //const [open, setOpen] = useState(false)
  const [calanderVisible, setCalanderVisible] = useState(false)
  const [selected, setSelected] = useState();
  const [zIndex, setZIndex] = useState(-1)
  const [name, setName] = useState();
  const [eventType, setEventType] = useState(["Group Meeting", "Client Meeting", "Office hour", "Discussions", "Normal Meeting"])
  const [note, setEventNote] = useState();
  const { event, eventId } = route.params;
  const { events, createEvent, deleteEvent } =
      useContext(AuthContext);

  // set calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onDayPress = (day) => {
     setSelectedDate(new Date(day.timestamp));
   };

  //date picker
  const [displaymode, setMode] = useState('date');
  const [isDisplayDate, setShow] = useState(false);
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
  };

  const closeCalanderView = () =>{ setCalanderVisible(false)};
  const openCalanderView = () =>{ setCalanderVisible(true)};


  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      title: "CalendarPage",
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
                onPress={() => showModal()}>

              <View style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center", }}>

                <Icon name="create" size={32} />

              </View>
            </TouchableOpacity>
          </View>
      ),
    });
  }, [route.params]);


  const storeEvent = async () => {
    try {
      await createEvent({
        eventName: name,
        eventType: selected,
        eventNote: note,
      });
      hideModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hideModal = () => {
    setVisible(false);
    setZIndex(-1)
  };
  const showModal = () => {
    setVisible(true);
    setZIndex(2)

  };


  // date pick mode
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    setCalanderVisible(true)
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
            eventId: event,
            event: item,
          });
          //then update events

        },
      },
      { text: "Cancel" },
    ]);
  };

  const handleCalanderChange = (e) =>{
    if(e.type === "dismissed"){
    }else if(e.type === "set"){
      setDate(new Date(e.nativeEvent.timestamp))
    }
    setCalanderVisible(false)

  }


  return (
      <View style={styles.container}>

        <Calendar
            style={{zIndex:1}}
            markedDates={{
              [selectedDate.toISOString().slice(0, 10)]: { selected: true, selectedColor: 'blue' }
            }}
            onDayPress={(day) =>setSelectedDate(new Date(day.dateString))}
            onDayLongPress={(day) => console.log('onDayLongPress', day) }
            onMonthChange={(date) => console.log('onMonthChange', date) }
            onPressArrowLeft={(goToPreviousMonth) => {
              console.log('onPressArrowLeft'); goToPreviousMonth();
            }}
            onPressArrowRight={(goToNextMonth) => {
              console.log('onPressArrowRight'); goToNextMonth();
            }}
        />



        <View style={{
          position: "absolute",
          zIndex: zIndex,
          width: "100%",
          height: "100%",
        }}>

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
                  }}>

                <View>
                  <Text style={{
                    fontSize: 30,
                    margin: 20,
                    textAlign: "center",
                    color: "#3B71F3",}}>
                    Let's create an event
                  </Text>

                  <CustomInput
                      placeholder={"Event Name"}
                      onChangeText={(newText) => setName(newText)}
                      style={{ borderRadius: 30}} />

                  <View style={styles.dropDown}>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={eventType}
                        save="value" />
                  </View>

                  <TextInput
                      keyboardType="text"
                      placeholder="Event Note: description etc.."
                      placeholderTextColor="lightgray"
                      style={styles.input}
                      onChangeText={(text) => {
                        setEventNote(text);
                      }}
                  />

                  <SafeAreaView>
                    <View>
                      <CustomButton onPress={displayDatepicker} text="Show date picker!" />
                    </View>

                    {calanderVisible && <DateTimePicker mode="date" value={date} display="inline" is24Hour={false} onChange={handleCalanderChange}
                    />}

                  </SafeAreaView>

                  <CustomButton text="Create Event" onPress={() => {storeEvent();}} />

                </View>
              </Modal>
            </Portal>
          </Provider>
        </View>

        <View>
          {/*<FlatList*/}
          {/*    data={events}*/}
          {/*    showsVerticalScrollIndicator={false}*/}
          {/*    renderItem={({ item }) => (*/}
          {/*        <TouchableOpacity*/}
          {/*            onLongPress={() => alertUser(item)}*/}
          {/*            style={styles.task}*/}
          {/*        >*/}
          {/*          <Text style={styles.name}>{item.eventName}</Text>*/}
          {/*          <Text style={styles.type}>{item.eventType}</Text>*/}
          {/*          <Text style={styles.note}>{item.eventNote}</Text>*/}
          {/*        </TouchableOpacity>*/}
          {/*    )}*/}

          {/*/>*/}
        </View>

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
    flex: 1,
  },
  body: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: '#3B71F3',
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
  task: {
    marginTop: 15,
    backgroundColor: "lightblue",
    height: 70,
    width: 370,
    borderRadius: 10,
  },
  name: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 5,
  },
  type: {
    marginLeft: 20,
    fontSize: 15,
  },
  note:{
    position: "absolute",
    left: 272,
    top: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
});


