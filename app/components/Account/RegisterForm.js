import React, { useState } from  'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import {validateEmail} from '../../utils/validateEmail'
export default function RegisterForm(){
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setRepeatShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormatValues())

    const onSumit = () =>{
        if(formData.email.length===0 || formData.email.length===0 ||formData.email.length===0){
            console.log('Todos los campos son requeridos')
            Alert.alert(
                "Alerta",
                "Todos los campos son requeridos",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if (!validateEmail(formData.email)){
            console.log('El email no es correcto')
            Alert.alert(
                "Alerta",
                "El email no es correcto",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if (formData.password !== formData.repeatPassword){
            console.log('Las contraseñas no coinciden')
            Alert.alert(
                "Alerta",
                "Las contraseñas no coinciden",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else if (formData.password.length < 6){
            console.log('El password debe tener mímo 6 caracteres')
            Alert.alert(
                "Alerta",
                "El password debe tener mímo 6 caracteres",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } else {
            console.log('Todo OK')
            Alert.alert(
                "Alerta",
                "Todo OK",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
    }

    const onChange = (e, type) => {
        //console.log(type)
        //console.log(e.nativeEvent.text)
        //setFormData({[type]: e.nativeEvent.text})
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        
        <View style={styles.formContainer}>
            <Text style={styles.textStyle}>Formulario de registro</Text>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Formulario de registro</Text>
            </View>
            <Input
                placeholder='Correo electronico'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, 'email')}
                rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>}
            />
            <Input
                placeholder='Contraseña'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, 'password')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder='Repetir Contraseña'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={!showRepeatPassword}
                onChange={(e) => onChange(e, 'repeatPassword')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setRepeatShowPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button
                title='Únete'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRegister}
                onPress={onSumit}
            />
            
        </View>
        
    )
}

function defaultFormatValues(){
    return{
        email: '',
        password: '',
        repeatPassword: ''
    }
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30
    },
    inputForm:{
        width:'100%',
        marginTop: 20
    },
    icon:{
        color:"#78c4d4"
    },
    btnContainer:{
        marginTop: 20,
        width: '95%'
        
    },
    btnRegister:{
        backgroundColor: '#b7657b'
    },
    textContainer:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
    ,
    textStyle:{
        fontWeight: "bold",
        fontSize: 20,
        color: '#b7657b'
    }
})