import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
// import { Timer, Countdown } from "react-native-element-timer";
import Timer from "react-native-countup-component";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Session from "../activityScreen/ActivitySession";

function ActivityTime({ navigation, route }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = React.useState(false);

  const [zIndex, setZIndex] = useState(2);

  const showModal = () => {
    setZIndex(1);
    setVisible(true);
  };
  const hideModal = () => {
    setZIndex(-1);
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 20,
  };

  useEffect(() => {
    const id = setInterval(() => setCount((oldCount) => oldCount + 1), 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Timer max={999} current={count} running={true} />
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <CustomInput placeholder="Note" />
              <CustomButton
                text="Save"
                // onPress={() => navigation.navigate("ActivitySession", title)}
              />
            </Modal>
          </Portal>
        </Provider>
        <CustomButton
          style={{ marginTop: 10 }}
          text="Done"
          onPress={showModal}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 200,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 40,
  },
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 20,
  },
});
export default ActivityTime;
