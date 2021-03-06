import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'firebase'


export default function ChangDisplayNameForm(props){
    const {displayName, setShowModal, toastRef, setreLoadUserInfo} = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = ()=>{
        setError(null)
        if(!newDisplayName){
            setError('El nombre no puede ser vacio')
            
        } else if(displayName === newDisplayName){
            setError('El nombre no puede ser igual')
        } else{
            setIsLoading(true)
            const update ={
                displayName: newDisplayName
            }
            firebase   
                .auth()
                .currentUser.updateProfile(update) 
                .then(()=>{
                    console.log('Ta bien desde firebase')
                    setIsLoading(false)
                    setreLoadUserInfo(true)
                    setShowModal(false)
                    toastRef.current.show({
                        type: 'success',
                        position: 'top',
                        text1: '¡Listo!',
                        text2: 'Se cambio el nombre',
                        visibilityTime: 3000
                    })
                })   
                .catch(()=>{
                    console.log('no tabien desde firebase')
                    setIsLoading(false)
                })    
        }
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder='Nombre y apellidos'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#b7657b'
                }}
                defaultValue={displayName || ''}
                onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title= 'Cambiar Nombre'
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