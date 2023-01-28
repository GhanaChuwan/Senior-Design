import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import CreateMenu from "./CreateMenu";

export default function SubjectBox({navigation, subject, deleteSubject}) {
    const alertUser = ()=>{
        Alert.alert(undefined,
            "are you sure you want to delete subject? ",
            [
                {text: "Yes",onPress:()=>{deleteSubject(subject)}},
                {text: "Cancel"}
            ],
        )
    }



    return (
        <TouchableOpacity onLongPress ={alertUser}  style={[styles.container,{backgroundColor: `${subject.color}`}]} onPress={()=>{navigation.navigate("SubjectPage", {title:subject.name});}}>
            <View style={[styles.top,{backgroundColor: `${subject.color}`}]}></View>
            <Text style={styles.text}>{subject.name}</Text>
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"",
        width:160,
        height:100,
        margin:15,
        borderRadius:5,

    },

    text:{
        fontSize:20,
        textAlign:"left",
        padding:10,
        color:"white"
    },
    top:{
        width:60,
        height:19,
        backgroundColor:"",
        position:"absolute",
        marginTop:-15,
        borderRadius:2

    }
})