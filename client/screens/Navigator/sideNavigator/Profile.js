import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { AuthContext } from "../../../context/AuthContext";
const Profile = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  const { userInfo } = useContext(AuthContext);

  // const { title } = route.params;
  useEffect(() => {
    //navigation.setOptions({ headerTitle: title });
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
      headerShown: true,
    });
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Avatar.Text
          size={90}
          backgroundColor="#1e407c"
          label={`${userInfo.user.firstName[0].toUpperCase()}${userInfo.user.lastName[0].toUpperCase()}`}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}> First Name:</Text>
        <Text style={[styles.input, { height: 40 }]}>
          {" "}
          {userInfo.user.firstName}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Last Name:</Text>
        <Text style={[styles.input, { height: 40 }]}>
          {" "}
          {userInfo.user.lastName}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Email Id:</Text>
        <Text style={[styles.input, { height: 40 }]}>
          {" "}
          {userInfo.user.email}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "#1e407c",
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />
      <Text style={styles.textChange}>Change the Password</Text>
      <View style={styles.row}>
        <Text style={styles.label}> Current Password:</Text>
        <TextInput
          style={[styles.input, { height: 40 }]}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> New Password:</Text>
        <TextInput
          style={[styles.input, { height: 40 }]}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Confirm Password:</Text>
        <TextInput
          style={[styles.input, { height: 40 }]}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
      </View>
      <CustomButton text="Save" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    // marginTop: 20,
  },
  avator: {
    marginRight: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    color: "#3B71F3",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 5,
    paddingHorizontal: 5,
    color: "#3B71F3",
    fontWeight: "bold",
  },
  textChange: {
    fontSize: 26,
    color: "#3B71F3",
  },
});
export default Profile;
