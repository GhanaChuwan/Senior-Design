import React from "react";
import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import SubjectBox from "../../components/SubjectBox";
import CreateFolder from "../../components/CreateFolder";
import { AuthContext } from "../../context/AuthContext";

export default function Subject({ navigation, route }) {
  useEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      title: "Subject",
      headerRight: () => (
        <View>
          <CreateFolder navigation={navigation} location="CreateSubject" />
        </View>
      ),
    });
  }, [route]);

  const { subjects, setSubjects } = useContext(AuthContext);
  const { deleteSubject, setDeleteSubjects } = useContext(AuthContext);

  const Delete = (subject) => {
    deleteSubject({ subjectId: subject._id });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fdf6ec", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subjectContainer}>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <SubjectBox
                navigation={navigation}
                subject={item}
                deleteSubject={Delete}
              />
            )}
            numColumns={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjectContainer: {
    marginTop: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 10,
    flex: 1,
  },
});
