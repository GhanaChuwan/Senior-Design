import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons"
export default function CreateFolder({navigation, location}) {
    return(
        <View>
            <TouchableOpacity>
                <AntDesign name="addfolder" onPress={()=>navigation.navigate(location)} style={styles.btn}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:20,
        fontSize:35,
        color:'#3B71F3',
        borderRadius:30,
        width:62,
        height:70,
    },
    btnContainer:{
        display:"flex",
        alignItems:"flex-end",


    }


})