import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";

export default function Calendar({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const parent = navigation.getParent();
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
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="create" size={32} />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [route.params]);
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const containerStyle = {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={"2023-02-12"}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 0,
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
                  style={{ borderRadius: 30 }}
                />
                <CustomButton text="Create Event" onPress={() => {}} />
              </View>
            </Modal>
          </Portal>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
