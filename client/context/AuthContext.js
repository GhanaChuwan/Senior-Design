import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../APIConnection/indexAPI";
export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [subjects, setSubjects] = useState([]);

    const login = async (email, password) =>{
        setIsLoading(true);
        axios.post('/sign-in', {
            email, password
        }).then(async res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.token);


            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', userInfo.token);

            await getSubjects();



        }).catch(error => {
            console.log(`Login error ${error}`);
        });
        setIsLoading(false);

    }
    const createAccount = async ({firstName, lastName, email, password, confirmPassword}) =>{
        setIsLoading(true);
        console.log({firstName, lastName, email, password, confirmPassword})
        axios.post('/create-user', {
            email, firstName, lastName, password, confirmPassword
        }).then(async res => {
            let userInfo = res.data;
            if(userInfo.success){
                setUserInfo(userInfo);
                setUserToken(userInfo.token);
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                await AsyncStorage.setItem('userToken', userInfo.token);
            }
        }).catch(error => {
            console.log(`Login error ${error}`);
        });
        setIsLoading(false);
    }
    const logout = async () =>{
        setIsLoading(true);
        setUserToken(null);
        await AsyncStorage.removeItem('userInfo')
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('subjects');
        setIsLoading(false);


    }

    const getSubjects = async ()=>{
        try{

            const res = await axios.get("/subject",{
                headers:{
                    "authorization":`Bearer ${userToken}`
                }
            })
            console.log("HERE")

            setSubjects(res.data)

            await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
        }catch (e){
            console.log(e)
        }
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');



            userInfo = JSON.parse(userInfo);
            if( userInfo )
            {
                setUserToken(userToken);
                setUserInfo(userInfo);
                await getSubjects();
            }

            setIsLoading(false);
        }catch (error)
        {
            console.log(`isLogged in error ${error}`);
            setIsLoading(false);
        }

    }
    const createSubject = async ({name, color}) =>{
        try{
            setIsLoading(true);

            const data = await axios.post('/create-subject',{
                name:name,
                color:color
            },{
                headers:{
                    "authorization":`Bearer ${userToken}`
                }
            })

            setSubjects([...subjects,data.data])
            await AsyncStorage.setItem('subjects', JSON.stringify(subjects));

        } catch(error) {
            console.log(error)
            console.log(`Can not able to create subject`);
        }
        setIsLoading(false);

    }

    useEffect( ()=>{
        const fetchData = async () => {
           try{
               await isLoggedIn()
           }catch (error){
               console.log(error)
           }
        }
        fetchData()
    },[userToken])

    return(
        <AuthContext.Provider value={{createAccount, login, logout,userToken, isLoading, userInfo, createSubject, getSubjects, subjects, setSubjects}}>
            {children}
        </AuthContext.Provider>
    )
}

