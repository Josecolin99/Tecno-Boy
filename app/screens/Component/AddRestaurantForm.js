import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function AddRestaurantForm(props){
    const {toastRef, setIsLoading} = props
    const [nameComponet, setNameComponet] = useState(null)// Nombre del componente
    const [marca, setMarca] = useState(null) // Nombre de la marca
    const [description, setDescription] = useState(null) // Descripcion del producto
    const [errorComponent, setErrorComponent] = useState(null) // Mensaje de error componente
    const [errorMarca, setErrorMarca] = useState(null) // Mensaje de error marca
    const [errorDescripcion, setErrorDescripcion] = useState(null) // Mensaje de error descripcion

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
            console.log('Descripción del producto:', description)
            toastRef.current.show({
                type: 'success',
                position: 'top',
                text1: '¡Listo!',
                text2: 'Todo chidori',
                visibilityTime: 3000
            })
        }
    }
    return(
        <View style={styles.view}>
            <Input
                placeholder='Nombre del componente'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
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
                placeholder='Descripción'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#b7657b'
                }}
                onChange={(e)=>setDescription(e.nativeEvent.text)}
                errorMessage={errorDescripcion}
            />
            <Button
                title= 'Cambiar Nombre'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                //loading={isLoading}
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