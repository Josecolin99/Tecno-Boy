import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'firebase'
import {validateEmail} from '../../utils/validateEmail'

export default function ChangEmailForm(props){
    const {email, setShowModal, toastRef, setreLoadUserInfo} = props
    const [newemail, setNewemail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorPass, setErrorPass] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    

    const onSubmit = ()=>{
        setError(null)
        if(!newemail){
            setError('El email no puede ser vacio')
            
        } else if(email === newemail){
            setError('El email no puede ser igual')
        }else if(!validateEmail(newemail)){
            setError('Email no valido')
        }else if(!password){
            setErrorPass('Ingrese el password')
        } else{
            setIsLoading(true)
            //const updateEmail(emau)         
            console.log(newemail)
            
            var user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            )
                    
            // Prompt the user to re-provide their sign-in credentials
                    
            user.reauthenticateWithCredential(credential).then(function() {
                firebase   
                .auth()
                .currentUser.updateEmail(newemail)
                .then(()=>{
                    console.log('Ta bien desde firebase')
                    setIsLoading(false)
                    setreLoadUserInfo(true)
                    setShowModal(false)
                })   
                .catch((error)=>{
                    console.log(error)

                    setIsLoading(false)
                })    
            }).catch(function(error) {
                setIsLoading(false)
                setErrorPass('El password no es correcto')

            });
            
        }
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder='Correo Nuevo'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'at',
                    color:'#b7657b'
                }}
                defaultValue={email || ''}
                onChange={(e)=>setNewemail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Input
                placeholder='Contraseña'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'form-textbox-password',
                    color:'#b7657b'
                }}
                //defaultValue={email || ''}
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPass}
            />

            <Button
                title= 'Cambiar Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10
    },
    view:{
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width:'95%'
    },
    btn:{
        backgroundColor: '#b7657b'
    }
})