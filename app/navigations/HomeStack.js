import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Restaurants from '../screens/Home'
import Home from '../screens/Home'

const Stack = createStackNavigator()

export default function HomeStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ title:'Inicio' }}
            />
        </Stack.Navigator>
    )
}