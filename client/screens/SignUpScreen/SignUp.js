import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation, StackActions } from "@react-navigation/native";
import API from "../../APIConnection/indexAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("First name is required!"),
  lastName: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Last name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short! ")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignUp = () => {
  const { createAccount } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    // navigation.setOptions({ headerTitle: title });
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
  }, []);
  const navigation = useNavigation();

  const signUp = async (values, formikActions) => {
    try {
      await createAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fdf6ec", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 70, paddingHorizontal: 20 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={{ marginBottom: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="#3B71F3" />
        </TouchableOpacity>
        <Text style={styles.title}>Create an account</Text>
        <View style={{ marginVertical: 20 }}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={signUp}
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
              const { firstName, lastName, email, password, confirmPassword } =
                values;
              return (
                <>
                  <CustomInput
                    value={firstName}
                    error={touched.firstName && errors.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    label="First Name"
                    placeholder="John"
                  />
                  <CustomInput
                    value={lastName}
                    error={touched.lastName && errors.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    label="Last Name"
                    placeholder="Smith"
                  />
                  <CustomInput
                    value={email}
                    error={touched.email && errors.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    label="Email"
                    placeholder="example@psu.edu"
                  />
                  <CustomInput
                    value={password}
                    error={touched.password && errors.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    autoCapitalize="none"
                    label="Password"
                    placeholder="*********"
                    secureTextEntry
                  />
                  <CustomInput
                    value={confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    autoCapitalize="none"
                    label="Confirm Password"
                    placeholder="********"
                    secureTextEntry
                  />
                  <CustomButton
                    submitting={isSubmitting}
                    onPress={handleSubmit}
                    text="Sign Up"
                  />
                  <CustomButton
                    text="Have an account? Sign-In"
                    type="LINKBUTTON"
                    onPress={() => navigation.navigate("SignIn")}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B71F3",
    margin: 10,
  },
});
export default SignUp;
