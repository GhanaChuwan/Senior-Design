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
  title,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { Card } from "react-native-paper";
import { Modal, Portal, Provider, TextInput, Title } from "react-native-paper";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";

export default function Grades({ navigation, route }) {
  const { title, subjectId } = route.params;
  const { grades, getAllGrades, createGrade, deleteGrade } =
    useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);
  const [zIndex, setZIndex] = useState(3);
  const [zIndexCard, setZIndexCard] = useState(1);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [selected, setSelected] = useState();
  const [pointsEarned, setPointsEarned] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [points, setPoints] = useState();
  const [gradeTypes, setGradeTypes] = useState([
    "Exams",
    "Quizzes",
    "Labs",
    "Homeworks",
    "Discussions",
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
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
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
      headerShown: true,
    });
    retrieveGrades({ subjectId });
  }, [subjectId]);

  const storeGrade = async () => {
    try {
      await createGrade({
        gradeName: name,
        gradeType: selected,
        gradePoints: points,
        subjectId: subjectId,
      });
      hideModal();
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const retrieveGrades = async () => {
    try {
      await getAllGrades({
        subjectId: subjectId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const alertUser = (item) => {
    Alert.alert(undefined, "are you sure you want to delete grade? ", [
      {
        text: "Yes",
        onPress: async () => {
          await deleteGrade({
            subject: title,
            grade: item,
          });
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
                <Text style={styles.modalHeader}>Let's create a grade</Text>

                <CustomInput
                  placeholder={"grade Name"}
                  onChangeText={(newText) => setName(newText)}
                  style={{ borderRadius: 30 }}
                />
                <View style={styles.dropDown}>
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={gradeTypes}
                    placeholder="Select Grade"
                    boxStyles={{ backgroundColor: "#3B71F3" }}
                    inputStyles={{ color: "#fff" }}
                    disabledTextStyles={{ color: "#fff" }}
                    dropdownStyles={{ backgroundColor: "#3B71F3" }}
                    dropdownTextStyles={{ color: "#fff" }}
                    save="value"
                  />
                </View>

                <View style={styles.pointsDiv}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    placeholder="points Earned"
                    placeholderTextColor="lightgray"
                    style={styles.input}
                    onChangeText={(text) => {
                      setPointsEarned(text);
                      setPoints(text + " / " + totalPoints);
                    }}
                  />

                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    placeholder="total points"
                    placeholderTextColor="lightgray"
                    style={styles.input}
                    onChangeText={(text) => {
                      setTotalPoints(text);
                      setPoints(pointsEarned + " / " + text);
                    }}
                  />
                </View>

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
      </View>
      <FlatList
        style={{ marginBottom: 10, zIndex: zIndexCard }}
        data={grades}
        // showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onLongPress={() => alertUser(item)}
          >
            <Card
              style={{
                backgroundColor: "lightgreen",
                marginVertical: 5,
                marginHorizontal: 10,
                padding: 1,
                alignContent: "center",
              }}
            >
              <Card.Content style={styles.card}>
                <Title style={styles.title}>{item.gradeName}</Title>
                <Text style={styles.point}>{item.gradeType}</Text>
                <Title style={styles.gradesP}>{item.gradePoints}</Title>
              </Card.Content>
            </Card>

            {/* <Text style={styles.name}>{item.gradeName}</Text>
              <Text style={styles.type}>{item.gradeType}</Text>
              <Text style={styles.points}>{item.gradePoints}</Text> */}
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    flexDirection: "column",
  },
  task: {
    marginTop: 15,
    backgroundColor: "lightgreen",
    height: 90,
    width: 350,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  assignments: {
    marginRight: 10,
    bottom: 30,
    top: 10,
    marginLeft: 9,
    position: "absolute",
    bottom: 30,
  },
  name: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 5,
  },
  type: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 15,
  },
  points: {
    position: "absolute",
    right: 10,
    top: 45,
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
    color: "#ffff",
  },
  btnText: {
    top: -20,
    left: 10,
    fontSize: 12,
    position: "relative",
  },
  input: {
    borderWidth: 2,
    borderColor: "#3B71F3",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
    width: 157,
    height: 20,
    backgroundColor: "transparent",
    marginHorizontal: 3,
  },
  pointsDiv: {
    display: "flex",
    flexDirection: "row",
  },
  dropDown: {
    marginVertical: 10,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 30,
    margin: 20,
    textAlign: "center",
    color: "#3B71F3",
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
    color: "black",
  },
  point: {
    fontSize: 15,
    textAlign: "left",
    color: "black",
  },
  gradesP: {
    fontSize: 20,
    textAlign: "right",
    color: "black",
  },
});
