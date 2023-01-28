import React from "react";
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Card, Paragraph, Title} from "react-native-paper";

export default  function Reward() {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>Reward</Title>
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fdf6ec',
        flex: 1,
        marginTop:5
    },
})