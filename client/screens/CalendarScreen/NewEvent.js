import React from "react";
import { useEffect, useState, useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {AuthContext} from "../../context/AuthContext";

export default function NewEvent({ navigation, route }) {
    const { title } = route.params;
    const { createGrade } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, []);
    const [name, setName] = useState();
    const [note, setNote] = useState();
    const [type, setType] = useState();

    const storeEvent = async () => {
        try {
            await storeEvent({
                eventName: name,
                eventType: type,
                eventNote: note,
                subject: title,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(e) => setName(e)}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Type"
                onChangeText={(e) => setType(e)}
            />
            <TextInput
                style={styles.input}
                placeholder="Event note"
                onChangeText={(e) => setNote(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    storeEvent();
                    navigation.navigate("CalendarPage", { title: title });
                }}
            >
                <Text style={styles.btn}>Create Event</Text>
            </TouchableOpacity>
        </View>
    );
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
        marginLeft: 44,
    },
    btn: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "red",
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
    },
});