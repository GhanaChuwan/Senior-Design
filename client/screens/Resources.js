import React from "react";
import { Title, Card, Paragraph } from "react-native-paper";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Resources() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Exploratory & Pre-Major Advising</Title>
            <Paragraph style={styles.paragraph}>
              Email ID: bdadvising@psu.edu
            </Paragraph>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6164</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Location:125 Reed Union Building (Second Floor){" "}
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#009CDE",
  },
  title: {
    color: "#fff",
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
  },
});
