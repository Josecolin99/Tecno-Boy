import React, { useState, useEffect } from 'react'

import firebase from 'firebase'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'
import {StyleSheet, View, Text} from 'react-native'

export default function Account(){
    const [login, setLogin] = useState(null)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
        console.log(user)
        !user ? setLogin(false) : setLogin(true)
        })
    }, [])
    if (login===null){ return (
                        //<View style = { styles.loading}>                             
                            <Loading 
                            isVisible = {true} 
                            text = 'Cargando...' 
                            style = { styles.loading}/>
                        //</View>
                        )}
    return login ? <UserLogged/> : <UserGuest/>

}

const styles = StyleSheet.create({
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent'        
    }
})