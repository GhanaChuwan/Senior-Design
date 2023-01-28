import React from "react";

import {Text, View, StyleSheet} from 'react-native'
import DesignCalendar from "./designCalendar";

export default function Calendar() {
    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <DesignCalendar/>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    body:{
        flex:1
    }
});