import React from 'react'
import{useEffect, useState, useContext} from "react";
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native'
import SubjectBox from "../../components/SubjectBox";
import CreateFolder from "../../components/CreateFolder";
import {AuthContext} from "../../context/AuthContext";



export default function Subject({navigation, route}) {

    const {item} = route.params;
    const {color} = route.params;

    const{subjects, setSubjects} = useContext(AuthContext);


    // useEffect(()=>{
    //     setSubjects((prevState)=>[{item: item, color:color},...prevState]);
    // },[item])

    const Delete = (subject) =>{
        setSubjects((prev)=>{
            const r = prev.filter((pre) => pre !== subject)
            return r;
        })
    }
    return(
        <SafeAreaView style={{ backgroundColor:'#fdf6ec', flex:1}}>
            <View style={styles.container}>
                <View style={{display:"flex",flexDirection:"row",width:1}}>
                    <View style={{width:305}}></View>
                    <CreateFolder navigation={navigation} location={"CreateSubject"}/>

                </View>
                <View style={styles.subjectContainer}>
                    <FlatList
                        data={subjects}
                        renderItem={({item})=>(<SubjectBox navigation={navigation} subject={item} deleteSubject={Delete}  />)}
                        numColumns={2}
                    />
                </View>
            </View>
        </SafeAreaView>

    )
}
const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    subjectContainer:{
        margin:10,
        alignItems:"flex-start",
        flex:1,
        marginTop:-20,


    }

})