import React, {useState, useContext, useEffect} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import Logo from '../../assets/Images/PSULogo.png'
import CustomInput from "../../components/CustomInput/CustomInput.js";
import CustomButton from "../../components/CustomButton/CustomButton";
import {StackActions, useNavigation} from '@react-navigation/native'
import {Formik} from "formik";
import * as Yup from 'yup'
import API from "../../APIConnection/indexAPI"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../context/AuthContext";
const validationSchema = Yup.object({
    email:Yup.string().email('Invalid email!').required('Email is required!'),
    password:Yup.string().trim().required('Password is required!'),
})
const SignIn = () => {
    const {login} = useContext(AuthContext);
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({
        email:'',
        password:''
    })



    const signIn = async (values, formikActions) =>{
        try{
             await login(values.email, values.password)
        } catch (error){
            console.log(error.message)
        }
    }

    return(
        <SafeAreaView style={{ backgroundColor:'#fdf6ec', flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop: 70,paddingHorizontal:20 }}>
                <View>
                    <Image source={Logo}
                           style={styles.logo}
                           resizeMode="center"/>
                    <Formik initialValues={userInfo}
                            validationSchema={validationSchema}
                            onSubmit={signIn}>
                        {({
                              values,
                              errors,
                              touched,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit}) => {

                            const {email, password} = values
                            return(
                                <>
                                    <CustomInput
                                        value={email}
                                        error={touched.email && errors.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        autoCapitalize='none'
                                        label='Email'
                                        placeholder="example@psu.edu"
                                    />
                                    <CustomInput
                                        value={password}
                                        error={touched.password && errors.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        autoCapitalize='none'
                                        label='Password'
                                        placeholder='*******'
                                        secureTextEntry
                                    />
                                    <CustomButton onPress={handleSubmit} text="Sign-In" />
                                    <CustomButton
                                        text="Forgot password?" type="LINKBUTTON" onPress={() => navigation.navigate('ForgotPassword')} />
                                    <CustomButton
                                        text="Don't have an account? Create on" type="LINKBUTTON" onPress={() => navigation.navigate('SignUp')}/>
                                </>
                            )
                        }}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
};
const styles = StyleSheet.create(
    {
        container: {
            alignItems:'center',
            padding:20,
            justifyContent:'center',

        },
        logo:{
            marginLeft:40,
            width:300,
            height:300,
        },
    }
);
export default SignIn