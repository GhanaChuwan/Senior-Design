import React from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Card, Title } from "react-native-paper";
import moment from "moment";
export default function Session({ navigation, route }) {
  const { title } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#1e407c",
      },
      headerTintColor: "#fff",
    });
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sessions</Text>
      <View>
        <CustomSessionsCard />
      </View>
      <View style={{ marginTop: 80, flex: 1 }}>
        <CustomButton
          text="Add Timer"
          onPress={() => navigation.navigate("ActivityTime")}
        />
      </View>
    </View>
  );
}
const CustomSessionsCard = () => {
  <Card>
    <Card.Content>
      <Title>hello</Title>
    </Card.Content>
  </Card>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdf6ec",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
