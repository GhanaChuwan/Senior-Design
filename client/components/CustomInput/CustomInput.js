import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";

const CustomInput = (props) => {
    const {placeholder, label, error} = props
    return(
        <>
            <Text style={{fontWeight:'bold', padding:10, color:'#3B71F3'}}>{label}</Text>
            {error ? ( <Text style={{color:'red', fontSize:16}}>{error}</Text>):null}
            <TextInput {...props} placeholder={placeholder} style={styles.input}/>
        </>
    )
};
const styles = StyleSheet.create({
    input:{
        borderWidth:2,
        borderColor:'#3B71F3',
        padding:10,
        borderRadius:5,
        fontSize:16,
        paddingLeft:10,
        marginBottom:10,

    },
});
export default CustomInput;