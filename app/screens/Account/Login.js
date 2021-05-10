import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import LoginForm from '../../components/Account/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Login(){
    const toastRef = useRef()
    return(
    <KeyboardAwareScrollView>
        <Image
            source={require('../../../assets/img/concepto-soporte-remoto-computadora_1284-13559.jpg')}
            resizeMode='contain'
            style={styles.logo}
        />
        <View style = {styles.viewForms}>
            <LoginForm toastRef={toastRef}/>
        </View>
        <View style={styles.viewContainer}>
            <Text></Text>
            <CreateAccount/>
        </View>
        <Divider style = {styles.divider}/>
        <Toast ref={toastRef}/>
    </KeyboardAwareScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textRegister}>
            ¿Aun no tienes una cuenta? {' '}
            <Text 
                style = {styles.linkRegister}
                onPress={()=>navigation.navigate('register')}
            >
                ¡Regístrate!
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    viewForms:{
        marginRight: 40,
        marginLeft: 40,
    },
    logo:{
        width: '100%',
        height: 300,
        marginTop: 20,
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
    },
    linkRegister:{
        color: '#b7657b',
        fontWeight: 'bold'
    },
    divider:{
        backgroundColor: '#78c4d4',
        margin: 40
    }
})