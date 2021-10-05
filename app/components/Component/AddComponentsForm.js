import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import { Input, Button, Avatar, Icon} from 'react-native-elements'
import Modal from '../../components/Modal'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { map, size, filter} from 'lodash'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'
import firebase from 'firebase'
//import { round } from 'react-native-reanimated'


export default function AddComponentsForm(props){
    const {toastRef, setIsLoading, navigation} = props
    //Use States de los inputs y sus errores
    const [nameComponet, setNameComponet] = useState(null)// Nombre del componente
    const [marca, setMarca] = useState(null) // Nombre de la marca
    const [locateText, setLocateText] = useState(null)
    const [description, setDescription] = useState(null) // Descripcion del producto
    const [errorComponent, setErrorComponent] = useState(null) // Mensaje de error componente
    const [errorMarca, setErrorMarca] = useState(null) // Mensaje de error marca
    const [errorDescripcion, setErrorDescripcion] = useState(null) // Mensaje de error descripcion
    
    const [isVisibleMap, setisVisibleMap] = useState(null) 
    const [imageSelected, setImageSelected] = useState([])

    //use state del la ubicacion
    const [locate, setLocate] = useState(null)
    const [locationComponent, setLocationComponent] = useState(null)

    const onSubmit = ()=>{
        
        if(!nameComponet && !marca && !description){
            setErrorComponent('Nombre del producto es requerido')
            setErrorMarca('Nombre de la marca es requerido')
            setErrorDescripcion('Descripcion es requerido')
        }else if(!marca && !description){
            setErrorComponent(null)
            setErrorMarca('Nombre de la marca es requerido')
            setErrorDescripcion('Descripcion es requerido')
        }else if(!nameComponet && !description){
            setErrorComponent('Nombre del producto es requerido')
            setErrorMarca(null)
            setErrorDescripcion('Descripcion es requerido')
        }else if(!marca && !nameComponet){
            setErrorComponent('Nombre del producto es requerido')
            setErrorMarca('Nombre de la marca es requerido')
            setErrorDescripcion(null)
        }else if(!nameComponet){
            setErrorComponent('Nombre del producto es requerido')
            setErrorMarca(null)
            setErrorDescripcion(null)
        }else if(!marca){
            setErrorComponent(null)
            setErrorMarca('Nombre de la marca es requerido')
            setErrorDescripcion(null)
        }else if(!description){
            setErrorComponent(null)
            setErrorMarca(null)
            setErrorDescripcion('Descripcion es requerido')
        }else{
            setErrorComponent(null)
            setErrorMarca(null)
            setErrorDescripcion(null)
            console.log('Nombre del componente:', nameComponet)
            console.log('Nombre de la marca:', marca)
            if(!locateText){
                console.log('Sin locacion')
            }else{
                console.log('Locacion: ', locationComponent)
            }
            console.log('Descripción del producto:', description)
            
            const imgurl = []
            
            map(imageSelected, async(uri) =>{
                console.log('******URI********')
                console.log(uri)
                
                uploadImage(uri)
                
            })
            const tecno ={
                name : nameComponet,
                marca : marca,
                locText : locateText,
                descrip : description,
                images : imageSelected,
                rating : 0,
                ratingTotal : 0,
                quantity : 0,
                
                createBy : firebase.auth().currentUser.uid
            }
            toastRef.current.show({
                type: 'success',
                position: 'top',
                text1: '¡Listo!',
                text2: 'Todo chidori',
                visibilityTime: 3000
            })
        }
    }

    const uploadImage = async (uri) => {
        console.log('**URI**')
        console.log(uri)
        const response = await fetch(uri)
        console.log(JSON.stringify(response))
        const blob = await response.blob()
        console.log('**Blob**')
        console.log(JSON.stringify(blob))
        const ref = firebase.storage().ref().child(`tecno/${uuid()}`)
        return ref.put(blob)
    }
    


    return(
        <ScrollView >
            <View style={styles.view}>
                <Input
                    placeholder='Nombre del componente'
                    placeholderTextColor="#78c4d4"
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'mouse-variant',
                        color:'#b7657b'
                    }}
                    onChange={(e)=>setNameComponet(e.nativeEvent.text)}
                    errorMessage={errorComponent}
                />
                <Input
                    placeholder='Marca'
                    placeholderTextColor="#78c4d4"
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'account-circle-outline',
                        color:'#b7657b'
                    }}
                    onChange={(e)=>setMarca(e.nativeEvent.text)}
                    errorMessage={errorMarca}
                />
                    <Input
                    placeholder='Locacion(Opcional)'
                    placeholderTextColor="#78c4d4"
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'map-search-outline',
                        color:'#b7657b',
                        onPress:()=> setisVisibleMap(true)
                    }}
                    onChange={(e)=>setLocateText(e.nativeEvent.text)}

                />
                <Input
                    placeholder='Descripicon'
                    placeholderTextColor="#78c4d4"
                    multiline={true}
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'format-align-justify',
                        color:'#b7657b'
                    }}
                    onChange={(e)=>setDescription(e.nativeEvent.text)}
                    errorMessage={errorDescripcion}
                />
                </View>
               <UploadImage
               toastRef={toastRef}
               imageSelected={imageSelected}
               setImageSelected={setImageSelected}
               />
                {/*Imagenes aqui */}
                <View style={styles.view}>
                    <Button
                        title= 'Agregar Componente'
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        onPress={onSubmit}
                        //loading={isLoading}
                    />
                </View>
                <Maps isVisibleMap={isVisibleMap} setisVisibleMap={setisVisibleMap} setLocationComponent={setLocationComponent} >
                    <Text>Cha</Text>
                </Maps>
            
        </ScrollView>
    )
}

function Maps(props){
    const {isVisibleMap, setisVisibleMap, setLocationComponent} = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async()=>{
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
            console.log(resultPermissions)
            const statusPermissions = resultPermissions.permissions.locationForeground.status
            if(!statusPermissions==='granted'){//poner toast aqui plis
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Permission',
                    text2: 'No diste permisos',
                    visibilityTime: 3000
                })
            }else{
                const locate = await Location.getCurrentPositionAsync({})
                console.log('*****************')
                console.log(locate)
                setLocation({
                    latitude: locate.coords.latitude,
                    longitude: locate.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
                setLocationComponent(locate)
                
            }
        })()
    }, [])

        const confirmLocation=()=>{
            setLocation(location)
            setisVisibleMap(false)
            console.log('---------------')
            console.log(location)
            setLocationComponent(location)

        }

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setisVisibleMap}>
            <View>
                {location&&
                    <MapView
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={(region)=>setLocation(region)}
                    >
                    <MapView.Marker
                        coordinate={{
                            latitude:location.latitude,
                            longitude:location.longitude
                        }}
                        draggable
                    />
                    </MapView>}
                    <View style={styles.viewBtn}>
                        <Button
                            title='Guardar Ubicación'
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={confirmLocation}
                        />
                        <Button
                            title='Cancelar Ubicación'
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={()=>setisVisibleMap(false)}
                        />
                    </View>
            </View>
        </Modal>
    )
}

//Seccion de subir imagen
function UploadImage({toastRef, imageSelected, setImageSelected}){

   //const imageSelect = async() =>{
   //    const response = await loadImageFromGallery()
   //    if(!response.status){
   //     toastRef.current.show({
   //         type: 'info',
   //         position: 'top',
   //         text1: 'Cancelled',
   //         text2: 'No elegiste alguna imagen',
   //         visibilityTime: 3000
   //     })
   //     return
   //    }
   //    setImageSelected([...imageSelected, response.image])
   //}
    
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
                text2: 'No elegiste una imagen',
                visibilityTime: 3000
            })
        } else{
            setImageSelected([...imageSelected, result.uri])
        }
    }
}

    const removeImage = (image) =>{
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar esta imagen?",
            [
                {
                    text: "No",
                    style: "cancel"

                },
                {
                    text: "Si",
                    onPress: ()=>{
                        setImageSelected(
                            filter(imageSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable : true
            }
        )
    }


    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
           {
               size(imageSelected) < 5 &&(
                <Icon
                        type="material-community"
                        name="camera"
                        color="#78c4d4" //poner azul
                        size={50}
                        iconStyle={styles.iconS}
                        containerStyle={styles.containerIcon}
                        onPress={ changeAvatar }

                    />
                    )
               }
               {
                    map(imageSelected,(imageComponent, index)=>(
                        <Avatar
                            key={index}
                            style={styles.miniatureStyle}
                            source={{uri:imageComponent}}
                            onPress={()=>removeImage(imageComponent)}
                            />
                    ))
               }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10,
        paddingRight:10,
        paddingLeft:10
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
    },
    viewImage:{
        flexDirection: 'row',
        marginHorizontal:20,
        marginTop: 30,
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10,
        height: 70,
        width:70,
        backgroundColor: '#e4e4e4'
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 20
    },
    mapStyle:{
        width: '100%',
        height: 550
    },
    viewBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnSave:{
        backgroundColor:'#78c4d4'
    },
    viewMapBtnContainerCancel:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor:'#a60d06'
    }

})