import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ColorOption from "../../components/ColorOption";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import ColorPicker from "react-native-wheel-color-picker";

export default function CreateSubject({ navigation, route }) {
  const { createSubject } = useContext(AuthContext);
  const [name, setName] = useState("");
  const { color } = route.params;
  const [selectedColor, setSelectedColor] = useState("#000000");

  const Subject = async () => {
    try {
      await createSubject({
        name: name,
        color: selectedColor,
      });

      navigation.pop();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 70, paddingHorizontal: 20 }}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Subject")}
            style={{ marginBottom: 40 }}
          >
            <AntDesign name="arrowleft" size={24} color="#3B71F3" />
          </TouchableOpacity>
          <Text style={styles.header}>Let's create a subject</Text>

          <CustomInput
            placeholder={"create a subject"}
            onChangeText={(newText) => setName(newText)}
          />
          <Text style={styles.colorChooser}>Choose a color </Text>
          <View style={styles.colorContainer}>
            <ColorPicker
              color={selectedColor}
              swatchesOnly={true}
              onColorChange={(color) => setSelectedColor(color)}
              thumbSize={40}
              noSnap={true}
              sliderSize={40}
              // Snap={true}
              row={false}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 30,
              backgroundColor: `${selectedColor}`,
              borderRadius: 5,
            }}
          ></View>
          <CustomButton text="Create Subject" onPress={Subject} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    color: "#3B71F3",
  },
  colorChooser: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    color: "gray",
  },
  colorContainer: {
    marginBottom: 20,
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
