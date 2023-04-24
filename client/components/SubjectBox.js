import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import CreateMenu from "./CreateMenu";

export default function SubjectBox({ navigation, subject, deleteSubject }) {
  const alertUser = () => {
    Alert.alert(undefined, "are you sure you want to delete subject? ", [
      {
        text: "Yes",
        onPress: () => {
          deleteSubject(subject);
        },
      },
      { text: "Cancel" },
    ]);
  };

  return (
    <TouchableOpacity
      onLongPress={alertUser}
      style={[styles.container, { backgroundColor: `${subject.color}` }]}
      onPress={() => {
        navigation.navigate("SubjectPage", {
          title: subject.name,
          subjectId: subject._id,
        });
      }}
    >
      <Text style={styles.text}>{subject.name.toUpperCase()}</Text>
      {/* <View
        style={[styles.top, { backgroundColor: `${subject.color}` }]}
      ></View>
      <Text style={styles.text}>{subject.name}</Text> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
    width: 180,
    height: 180,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, .5)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7.30,
    elevation: 13,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

  text: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    fontWeight:'600',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7.30,
    elevation: 13,

  },
  top: {
    width: 60,
    height: 19,
    backgroundColor: "",
    position: "absolute",
    marginTop: -15,
    borderRadius: 2,
  },
});
