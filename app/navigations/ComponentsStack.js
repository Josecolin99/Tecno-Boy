import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Components from '../screens/Component/Components'
import AddComponents from '../components/Component/AddComponents'

const Stack = createStackNavigator()

export default function ComponentsStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='components'
                component={Components}
                options={{ title:'Componentes' }}
            />
            <Stack.Screen
                name='addcomponents'
                component={AddComponents}
                options={{ title:'AddComponentes' }}
            />
        </Stack.Navigator>
    )
}