import React,{useState, useRef, useEffect} from 'react'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'
import Toast from 'react-native-toast-message';

export default function UserLogged(){
    const [userInfo, sethUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect( ()=>{
        (async()=>{
            const user = await firebase.auth().currentUser
            sethUserInfo(user)
        })()
    }, [])
    return(
        <ScrollView>
            <View style={styles.viewcontainer}>
                <Text>UserLogged</Text>
                {userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef}/>}
                <Button title='Únete'
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnRegister}
                    title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
                <Toast ref={toastRef}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 20,
        width: '95%'
        
    },
    btnRegister:{
        backgroundColor: '#b7657b'
    },
    viewcontainer:{
        alignItems: 'center'
    }
})