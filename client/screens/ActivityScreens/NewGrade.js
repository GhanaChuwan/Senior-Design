import React from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
export default function NewGrade({ navigation, route }) {

    const { title } = route.params;
    const { createGrade } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({ headerShown: true })
    }, [])
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [points, setPoints] = useState();

    const storeGrade = async () => {
        try {
            await createGrade({
                gradeName: name,
                gradeType: type,
                gradePoints: points,
                subject: title
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Name' onChangeText={(e) => setName(e)} />
            <TextInput style={styles.input} placeholder='Grade Type' onChangeText={(e) => setType(e)} />
            <TextInput style={styles.input} placeholder='Due Date' onChangeText={(e) => setPoints(e)} />
            <TouchableOpacity onPress={() => { storeGrade; navigation.navigate("Grades", { title: title }) }}>
                <Text style={styles.btn}>Create Grade</Text>
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: "lightblue",
        height: 50,
        width: 300,
        margin: 10,
        marginLeft: 44
    },
    btn: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "red",
        padding: 10,
        fontSize: 20,
        borderRadius: 10
    }

})