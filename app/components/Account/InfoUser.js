import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker  from 'expo-image-picker'
import AccountOption from './AccountOption'
import Loading from '../../components/Loading'


export default function InfoUser(props){
    //const {userInfo} = props
    //const{photoURL, displayName, email} = userInfo
    //console.log(photoURL)
    //console.log(displayName)
    //console.log(email)
    const{userInfo:{uid, photoURL, displayName, email},userInfo,setreLoadUserInfo, toastRef} = props
    
    const changeAvatar= async()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

        if(resultPermissionsCamera === 'denied'){
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Permissions',
                text2: 'Es necesario aceptar los permisos de la galeria',
                visibilityTime: 3000
            })
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            console.log(result)
            if (result.cancelled){
                toastRef.current.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'No elegiste un avatar',
                    visibilityTime: 3000
                })
            } else{
                uploadImage(result.uri).then(()=>{
                    console.log('Imagen en firebase')
                    updatePhotoUrl()
                    }).catch(()=>{
                        toastRef.current.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Firebase Error',
                            text2: 'Error al actualizar el avatar',
                            visibilityTime: 3000
                        })
                    })
                }
            }
    }

    const uploadImage = async (uri) => {
        console.log('******URI********')
        console.log(uri)
        const response = await fetch(uri)
        console.log(JSON.stringify(response))
        const blob = await response.blob()
        console.log('********Blob**********')
        console.log(JSON.stringify(blob))
        
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob)
    }

    const updatePhotoUrl = () =>{
        firebase .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async(respose)=>{
            console.log(respose)
            const update ={
                photoURL: respose
            }
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen Actualizada')
            setreLoadUserInfo(true)
        })
    }
 
    return(
        <View>
            <View style={styles.viewUserInfo}>
                <Avatar
                    title='ICR'
                    rounded
                    size='large'
                    onPress={changeAvatar}
                    containerStyle={styles.userAvatar}
                    source={
                        photoURL ? { uri:photoURL } : require('../../../assets/img/avatar-default.jpg')
                    }
                />
                <View style={styles.viewInfo}>
                    <Text style={styles.displayName}>{displayName ? displayName : 'Sin nombre definido'}</Text>
                    <Text>{email ? email : 'Sin email definido'}</Text>
                </View>
            </View>
            <View>
                <AccountOption userInfo={userInfo} toastRef={toastRef} setreLoadUserInfo={setreLoadUserInfo}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', //aqui checa lo de la dirección
        paddingTop: 30,
        paddingBottom:30
    },
    userAvatar:{
        marginTop: 20,
        backgroundColor: '#b7657b' //Cambia el color
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom:5
    },
    viewInfo:{
        paddingTop: 20,
        paddingLeft:15
    }
})