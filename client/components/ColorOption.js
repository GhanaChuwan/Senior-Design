import React from "react";
import{StyleSheet,TouchableOpacity,View} from "react-native";
import {useState} from "react";

export default function ColorOption({navigation}){
    const[red, setRed] = useState(false);
    const[blue, setBlue] = useState(false);
    const[orange, setOrange] = useState(false);
    const[green, setGreen] = useState(false);
    const[pink, setPink] = useState(false);
    const[yellow, setYellow] = useState(false);
    const[gray, setGray] = useState(false);

    const[redCount,setRedCount] = useState(1);
    const[blueCount,setBlueCount] = useState(1);
    const[orangeCount,setOrangeCount] = useState(1);
    const[greenCount,setGreenCount] = useState(1);
    const[pinkCount, setPinkCount] = useState(false);
    const[yellowCount, setYellowCount] = useState(false);
    const[grayCount, setGrayCount] = useState(false);

    const setColor = (color)=>{
        switch (color){
            case "green":
                setGreenCount(greenCount + 1);
                setRedCount(1);
                setBlueCount(1);
                setOrangeCount(1);

                setGreen(true);
                setRed(false);
                setOrange(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"green"})
                break;
            case "red":
                setRedCount(redCount + 1);
                setGreenCount(1);
                setBlueCount(1);
                setOrangeCount(1);

                setRed(true);
                setGreen(false);
                setOrange(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"red"})
                break;

            case "blue":
                setBlueCount(blueCount + 1);
                setRedCount(1);
                setGreenCount(1);
                setOrangeCount(1);

                setBlue(true);
                setRed(false);
                setOrange(false);
                setGreen(false);
                navigation.navigate("CreateSubject",{color:"blue"})
                break;

            case "orange":
                setOrangeCount(orangeCount + 1);
                setRedCount(1);
                setBlueCount(1);
                setGreenCount(1);

                setOrange(true);
                setRed(false);
                setGreen(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"orange"})
                break;

            case "pink":
                setPinkCount(pinkCount+1);
                setOrangeCount( 1);
                setRedCount(1);
                setBlueCount(1);
                setGreenCount(1);

                setPink(true);
                setOrange(false);
                setRed(false);
                setGreen(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"pink"})
                break;

            case "yellow":
                setYellowCount(yellowCount+1);
                setPinkCount(1);
                setOrangeCount( 1);
                setRedCount(1);
                setBlueCount(1);
                setGreenCount(1);

                setYellow(true);
                setPink(false);
                setOrange(false);
                setRed(false);
                setGreen(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"yellow"})
                break;

            case "gray":
                setGrayCount(grayCount+1);
                setYellowCount(1);
                setPinkCount(1);
                setOrangeCount( 1);
                setRedCount(1);
                setBlueCount(1);
                setGreenCount(1);

                setGray(true);
                setYellow(false);
                setPink(false);
                setOrange(false);
                setRed(false);
                setGreen(false);
                setBlue(false);
                navigation.navigate("CreateSubject",{color:"gray"})
                break;

        }
    }
    return(
        <View style={{display:"flex",flexDirection:"row"}}>
            <TouchableOpacity style={[styles.container,{backgroundColor: "green"},greenCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}  onPress={()=>setColor("green")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "red"},redCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}    onPress={()=>setColor("red")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "orange"},orangeCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]} onPress={()=>setColor("orange")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "blue"},blueCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}   onPress={()=>setColor("blue")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "pink"},blueCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}   onPress={()=>setColor("pink")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "yellow"},blueCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}   onPress={()=>setColor("yellow")}/>
            <TouchableOpacity style={[styles.container,{backgroundColor: "gray"},blueCount % 2=== 0 ? {borderColor: "gray"} : {borderColor: "transparent"}]}   onPress={()=>setColor("gray")}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:30,
        height:30,
        margin:10,
        borderRadius:10,
        borderWidth:3,
        borderColor:"transparent"
    }
})