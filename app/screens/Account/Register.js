import React from 'react'
import {} from 'react-native'
import {StyleSheet, View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from '../../components/Account/RegisterForm'

export default function Register(){
    return(
        <KeyboardAwareScrollView>
                <Image
                    source={require('../../../assets/img/concepto-soporte-remoto-computadora_1284-13559.jpg')}
                    resizeMode='contain'
                    style={styles.logo}
                />
                <View style = {styles.viewForms}>
                    <RegisterForm/>
                </View>
        </KeyboardAwareScrollView>
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
})