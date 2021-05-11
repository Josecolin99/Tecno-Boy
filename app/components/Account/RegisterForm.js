import React, { useState } from  'react'
import { StyleSheet, View, Text } from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import {validateEmail} from '../../utils/validateEmail'
import firebase from 'firebase'
import {useNavigation} from '@react-navigation/native'

export default function RegisterForm(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setRepeatShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormatValues())
    const navigation = useNavigation()

    const onSumit = () =>{
        if(formData.email.length===0 || formData.password.length===0 ||formData.repeatPassword.length===0){
            console.log('El email no es correcto')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requieridos',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else if (!validateEmail(formData.email)){
            console.log('El email no es correcto')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Error Email',
                text2: 'El email no es correcto',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else if (formData.password !== formData.repeatPassword){
            console.log('El password debe tener mímo 6 caracteres')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Error Coincidencia',
                text2: 'Las contraseñas no coinciden',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else if (formData.password.length < 6){
            console.log('')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Error Contraseña',
                text2: 'El password debe tener mímo 6 caracteres',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else {
            console.log('Todo OK')
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response)=>{
                console.log(response)
                navigation.navigate('account')
            })
            .catch((err)=>{
                console.log(err)
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Ya quieres hackear esta cuenta',
                    text2: 'Correo ya en uso, utilice otro plis',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {},
                    onPress: () => {}
                  });
            })
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