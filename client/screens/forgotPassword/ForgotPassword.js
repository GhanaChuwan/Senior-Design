import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
});
const ForgotPassword = ({ navigation }) => {
  const [userInfo] = useState({
    email: "",
  });
  const { ForgotPassword, forgotPasswordLink } = useContext(AuthContext);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
      headerShown: true,
    });
  }, []);

  const forgotPasswordButton = async (values) => {
    try {
      await forgotPasswordLink(values.email);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={{ backgroundColor: "#fdf6ec", flex: 1 }}>
      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={forgotPasswordButton}
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
            const { email } = values;
            return (
              <>
                <Text style={styles.title}>Forgot Password?</Text>
                <CustomInput
                  value={email}
                  error={touched.email && errors.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  autoCapitalize="none"
                  label="Email"
                  placeholder="example@psu.edu"
                />
                <CustomButton onPress={handleSubmit} text="Submit" />
              </>
            );
          }}
        </Formik>
        {/* <Text style={styles.title}>Forgot Password?</Text>

        <CustomInput
          label="Email"
          autoCapitalize="none"
          placeholder="example@psu.edu"
        />
        <CustomButton text="Submit" onPress={forgotPasswordButton} /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B71F3",
    margin: 10,
  },
});
export default ForgotPassword;
