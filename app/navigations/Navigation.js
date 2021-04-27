import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import HomeStacks from './HomeStack'
import ServicesStacks from './ServicesStack'
import ComponentsStacks from './ComponentsStack'
import SearchStacks from './SearchStack'
import AccountsStack from './AccountsStack'


const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='home'
                tabBarOptions={{
                    inactiveTintColor: '#ff637d',
                    activeTintColor: '#66d7d1'
                }}
                screenOptions={({ route }) =>({
                    tabBarIcon:({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen 
                name='home'
                component={HomeStacks}
                options={{title:"Inicio"}}
                />
                 <Tab.Screen 
                name='services'
                component={ServicesStacks}
                options={{title:"Servicio Tecnico"}}
                />
                <Tab.Screen 
                name='components'
                component={ComponentsStacks}
                options={{title:"Componentes"}}
                />
                <Tab.Screen 
                name='search'
                component={SearchStacks}
                options={{title:"Busqueda"}}
                />
                <Tab.Screen 
                name='account'
                component={AccountsStack}
                options={{title:"Cuenta"}}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName

    switch (route.name) {
        case 'home':
            iconName='compass-outline'
            break
        case 'services':
            iconName='heart-outline'
            break
        case 'components':
            iconName='star-outline'
            break
        case 'search':
            iconName='magnify'
            break
        case 'account':
            iconName='home-outline'
            break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}