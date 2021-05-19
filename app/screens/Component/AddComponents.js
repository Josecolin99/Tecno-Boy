import React, {useState, useRef} from 'react'
import {View, Text} from 'react-native'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import AddRestaurantForm from './AddRestaurantForm'


export default function AddComponents(){
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef()
    return(
        <View>
            <Text>AddComponents</Text>
            <AddRestaurantForm toastRef={toastRef} setIsLoading={setIsLoading}/>
            <Loading isVisible={isLoading} text={'Cargando...'}/>
            <Toast ref={toastRef}/>
        </View>
    )
}