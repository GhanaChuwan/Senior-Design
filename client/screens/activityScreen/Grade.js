import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Grades({ navigation, route }) {
  const { title } = route.params;
  const { grades, getAllGrades, createGrade, deleteGrade } =
    useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState(2);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [pointsEarned, setPointsEarned] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [points, setPoints] = useState();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
    retrieveGrades({ title });
  }, [title]);

  const storeGrade = async () => {
    try {
      await createGrade({
        gradeName: name,
        gradeType: type,
        gradePoints: points,
        subject: title,
      });
      hideModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const showModal = () => {
    setZIndex(-1);
    setVisible(true);
  };
  const hideModal = () => {
    setZIndex(1);
    setVisible(false);
  };

  const retrieveGrades = async () => {
    try {
      await getAllGrades({
        subject: title,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const alertUser = (item) => {
    Alert.alert(undefined, "are you sure you want to delete task? ", [
      {
        text: "Yes",
        onPress: async () => {
          // let newGrade = grades.filter(grade => grade != item);
          // setGrades(newGrade);
          console.log("deleting grade");
          await deleteGrade({
            subject: title,
            grade: item,
          });
          //then update grades
        },
      },
      { text: "Cancel" },
    ]);
  };

  const containerStyle = {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View>
              <Text style={styles.modalHeader}>Let's create a grade</Text>
              <CustomInput
                placeholder={"grade Name"}
                onChangeText={(newText) => setName(newText)}
                style={{ borderRadius: 30 }}
              />
              <CustomInput
                placeholder={"grade Type"}
                onChangeText={(newText) => setType(newText)}
                style={{ borderRadius: 30 }}
              />
              <CustomInput
                placeholder={"points earned"}
                onChangeText={(newText) => setPoints(newText)}
                style={{ borderRadius: 30 }}
              />

              <CustomButton
                text="Create Grade"
                onPress={() => {
                  storeGrade();
                }}
              />
            </View>
          </Modal>
        </Portal>
      </Provider>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginLeft: 11 }}
          onPress={() => showModal()}
        >
          <View>
            <AntDesign name="upload" style={styles.newTaskBtn} />
            <Text style={styles.btnText}>New Grade</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 260 }}>
          <AntDesign
            name="filter"
            onPress={() => alert("filtering stuff")}
            style={styles.newTaskBtn}
          />
          <Text style={[styles.btnText, { marginLeft: 14 }]}>filter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.assignments, zIndex: zIndex, marginTop: 5 }}>
        <FlatList
          data={grades}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => alertUser(item)}
              style={styles.task}
            >
              <Text style={styles.name}>{item.gradeName}</Text>
              <Text style={styles.type}>{item.gradeType}</Text>
              <Text style={styles.points}>{item.gradePoints}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
  },
  task: {
    marginTop: 15,
    backgroundColor: "lightblue",
    height: 70,
    width: 370,
    borderRadius: 10,
  },
  assignments: {
    top: 50,
    marginLeft: 9,
    position: "absolute",
    bottom: 30,
    top: 50,
    marginLeft: 9,
    position: "absolute",
    bottom: 30,
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
  points: {
    position: "absolute",
    left: 272,
    top: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 20,
    fontSize: 35,
    color: "#3B71F3",
    borderRadius: 30,
    width: 62,
    height: 70,
  },

  header: {
    marginLeft: -12,
    height: 50,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
  },
  newTaskBtn: {
    height: 40,
    width: 40,
    fontSize: 30,
    margin: 10,
    left: 10,
  },
  btnText: {
    top: -20,
    left: 10,
    fontSize: 12,
    position: "relative",
  },
});
