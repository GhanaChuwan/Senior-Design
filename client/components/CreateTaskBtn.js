import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"
export default function CreateTaskBtn({ navigation }) { //location
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity>
                <AntDesign name="upload" onPress={() => alert()} style={styles.btn} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        fontSize: 35,
        color: '#3B71F3',
        borderRadius: 30,
        width: 62,
        height: 70,
    },
    btnContainer: {
        marginLeft: 330,
        position: "absolute"


    }


})