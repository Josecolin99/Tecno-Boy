import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Components from '../screens/Components'

const Stack = createStackNavigator()

export default function ComponentsStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='components'
                component={Components}
                options={{ title:'Componentes' }}
            />
        </Stack.Navigator>
    )
}