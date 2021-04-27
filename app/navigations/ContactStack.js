import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Contact from '../screens/Contact'

const Stack = createStackNavigator()

export default function ContactStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='contact'
                component={Contact}
                options={{ title:'Contacto' }}
            />
        </Stack.Navigator>
    )
}