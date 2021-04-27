import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Services from '../screens/Services'

const Stack = createStackNavigator()

export default function ServicesStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='services'
                component={Services}
                options={{ title:'Servicios Tecnicos' }}
            />
        </Stack.Navigator>
    )
}