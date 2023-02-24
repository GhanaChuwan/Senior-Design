import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
  Text,
  View,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default function Reward({ navigation, route }) {
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ title: "Rewards", headerRight: null });
  }, [route.params]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card1}>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#7f6000",
              height: 25,
              marginTop: 10,
              marginRight: 10,
            }}
          >
            <Avatar
              rounded
              source={require("../assets/Images/Bronze1.png")}
              size="large"
            />
          </View>
          <View style={{ display: "flex", height: 100, padding: 10 }}>
            <Card.Content style={styles.cardContainer}>
              <Title style={styles.title}>Bronze</Title>

              <Paragraph style={styles.paragraph}>
                Spend 10 hours minimum studying in a specific subject folder.
              </Paragraph>
            </Card.Content>
          </View>
        </Card>
        <Card style={styles.card2}>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#C0C0C0",
              height: 25,
              marginTop: 10,
              marginRight: 10,
            }}
          >
            <Avatar
              rounded
              source={require("../assets/Images/Silver2.png")}
              size="large"
            />
          </View>
          <View style={{ display: "flex", height: 100, padding: 10 }}>
            <Card.Content style={styles.cardContainer}>
              <Title style={styles.title}>Silver</Title>

              <Paragraph target="_blank" style={styles.paragraph}>
                Spend 30 hours minimum studying in a specific subject folder.
              </Paragraph>
              <Paragraph target="_blank" style={styles.paragraph}></Paragraph>
            </Card.Content>
          </View>
        </Card>

        <Card style={styles.card3}>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#bf9000",
              height: 25,
              marginTop: 10,
              marginRight: 10,
            }}
          >
            <Avatar
              rounded
              source={require("../assets/badges/gold1.png")}
              size="large"
            />
          </View>
          <View style={{ display: "flex", height: 100, padding: 10 }}>
            <Card.Content style={styles.cardContainer}>
              <Title style={styles.title}>Gold</Title>

              <Paragraph target="_blank" style={styles.paragraph}>
                Spend 50 hours minimum studying in a specific subject folder.
              </Paragraph>
              <Paragraph target="_blank" style={styles.paragraph}></Paragraph>
            </Card.Content>
          </View>
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
    marginHorizontal: 10,
  },
  card1: {
    backgroundColor: "#7f6000",
    marginVertical: 5,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  card2: {
    backgroundColor: "#C0C0C0",
    marginVertical: 5,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  card3: {
    backgroundColor: "#bf9000",
    marginVertical: 5,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
    marginRight: 20,
    paddingRight: 30,
  },
  title: {
    color: "#fff",
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
  },
  underline: {
    textDecorationLine: "underline",
  },
});
