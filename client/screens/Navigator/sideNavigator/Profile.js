import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { AuthContext } from "../../../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, "Password is too short! ")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});
const Profile = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  const { userInfo } = useContext(AuthContext);
  const [Info, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { changepassword, changePasswordLink } = useContext(AuthContext);
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

  const changePasswordSubmit = async (values) => {
    try {
      await changePasswordLink(
        values.currentPassword,
        values.newPassword,
        values.confirmPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <Text style={styles.input}> {userInfo.user.firstName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Last Name:</Text>
        <Text style={styles.input}> {userInfo.user.lastName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}> Email Id:</Text>
        <Text style={[styles.input, { marginLeft: 17 }]}>
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
      <Formik
        initialValues={Info}
        validationSchema={validationSchema}
        onSubmit={changePasswordSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { currentPassword, newPassword, confirmPassword } = values;
          return (
            <>
              <View style={styles.row}>
                <Text style={styles.label}> Current Password:</Text>
                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  error={touched.currentPassword && errors.currentPassword}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  autoCapitalize="none"
                  placeholder="********"
                  secureTextEntry
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}> new Password:</Text>
                <TextInput
                  style={[styles.input, { marginLeft: 25 }]}
                  value={newPassword}
                  error={touched.newPassword && errors.newPassword}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  autoCapitalize="none"
                  placeholder="********"
                  secureTextEntry
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}> Confirm Password:</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  autoCapitalize="none"
                  placeholder="********"
                  secureTextEntry
                />
              </View>
              <CustomButton text="Save" onPress={handleSubmit} />
            </>
          );
        }}
      </Formik>
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
