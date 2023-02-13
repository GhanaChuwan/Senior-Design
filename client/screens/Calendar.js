import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import DesignCalendar from "./designCalendar";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import CustomInput from "../../client/components/CustomInput/CustomInput";
import CustomButton from "../../client/components/CustomButton/CustomButton";
import ColorPicker from "react-native-wheel-color-picker";

export default function Calendar({ navigation, route }) {
    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ title: "Calander", headerRight: null });
    }, [route.params]);

    return (
        <View style={styles.container}>
            <View style={styles.container}></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fdf6ec",
        flex: 1,
    },
    header: {
        fontSize: 30,
        margin: 20,
        textAlign: "center",
    },
});