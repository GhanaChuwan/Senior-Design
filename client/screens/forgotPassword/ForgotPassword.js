import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AntDesign } from '@expo/vector-icons';
const ForgotPassword = ({navigation}) =>{
    return(
        <SafeAreaView style={{ backgroundColor:'#fdf6ec', flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop: 70,paddingHorizontal:20 }}>
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={{marginBottom:40}}>
                        <AntDesign name="arrowleft" size={24} color="#3B71F3" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <CustomInput
                        label='Email'
                        autoCapitalize='none'
                        placeholder="example@psu.edu"
                    />
                    <CustomButton
                        text="Submit"
                    />
                </>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            alignItems:'center',
            padding:20,
            justifyContent:'center',

        },
        title:{
            fontSize: 24,
            fontWeight:'bold',
            color:'#3B71F3',
            margin: 10,
        },
    }
);
export default ForgotPassword