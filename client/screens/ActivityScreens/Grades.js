import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CreateTaskBtn from '../../components/CreateTaskBtn';
import { AntDesign } from "@expo/vector-icons"
import { AuthContext } from "../../context/AuthContext";


export default function Grades({ navigation, route }) {

    const { title } = route.params;
    const { grades, setGrades } = useContext(AuthContext);
    const { getAllGrades } = useContext(AuthContext);
    const { deleteGrade } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
        retrieveGrades();
    }, [])


    const retrieveGrades = async () => {
        try {
            await getAllGrades({
                subject: title,
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const alertUser = (item) => {
        Alert.alert(undefined,
            "are you sure you want to delete task? ",
            [
                {
                    text: "Yes", onPress: async () => {
                        // let newGrade = grades.filter(grade => grade != item);
                        // setGrades(newGrade);
                        console.log("deleting grade");
                        await deleteGrade({
                            subject: title,
                            grade: item
                        });
                        //then update grades
                    }
                },
                { text: "Cancel" }
            ],
        )
    }
    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={{ marginLeft: 0 }} >
                    <AntDesign name="upload" onPress={() => navigation.navigate("NewGrade", { title: title })} style={styles.newTaskBtn} />
                    <Text style={styles.btnText}>New Grade</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 260 }} >
                    <AntDesign name="filter" onPress={() => alert("filtering stuff")} style={styles.newTaskBtn} />
                    <Text style={[styles.btnText, { marginLeft: 14 }]}>filter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.assignments}>
                <FlatList
                    data={grades}
                    renderItem={({ item }) => (<TouchableOpacity onLongPress={() => alertUser(item)} style={styles.task}><Text style={styles.name}>{item.gradeName}</Text><Text style={styles.type}>{item.gradeType}</Text><Text style={styles.points}>{item.gradePoints}</Text></TouchableOpacity>)}
                />
            </View>

        </SafeAreaView>



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 12
    },
    task: {
        marginTop: 15,
        backgroundColor: "lightblue",
        height: 70,
        width: 370,
        borderRadius: 10
    },
    assignments: {
        marginTop: 10
    },
    name: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 5,
    },
    type: {
        marginLeft: 20,
        fontSize: 15
    },
    points: {
        position: "absolute",
        left: 272,
        top: 30,
        fontSize: 20,
        fontWeight: "bold"
    },
    btn: {
        marginTop: 20,
        fontSize: 35,
        color: '#3B71F3',
        borderRadius: 30,
        width: 62,
        height: 70,
    },

    header: {
        marginLeft: -12,
        height: 50,
        display: "flex",
        flexDirection: "row"
    },
    newTaskBtn: {
        height: 40,
        width: 40,
        fontSize: 30,
        margin: 10,
        left: 10,
    },
    btnText: {
        top: -20,
        left: 10,
        fontSize: 12,
        position: "relative"
    }


})