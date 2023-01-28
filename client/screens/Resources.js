import React from "react";
import {Title, Card, Paragraph} from "react-native-paper";
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";

export default function Resources() {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>Exploratory & Pre-Major Advising</Title>
                        <Paragraph>Email ID: bdadvising@psu.edu</Paragraph>
                        <Paragraph>Phone: 814-898-6164</Paragraph>
                        <Paragraph>Office: Monday-Friday, 8:00am-5:00pm</Paragraph>
                        <Paragraph>Location:125 Reed Union Building (Second Floor) </Paragraph>
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
});