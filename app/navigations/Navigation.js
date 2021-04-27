import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import HomeStacks from './HomeStack'
import ServicesStacks from './ServicesStack'
import ComponentsStacks from './ComponentsStack'
import ContactStacks from './ContactStack'
import AccountsStack from './AccountsStack'


const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='home'
                tabBarOptions={{
                    inactiveTintColor: '#b7657b',
                    activeTintColor: '#78c4d4'
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
                name='contact'
                component={ContactStacks}
                options={{title:"Contacto"}}
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
            iconName='face-agent'
            break
        case 'components':
            iconName='desktop-classic'
            break
        case 'contact':
            iconName='card-account-mail'
            break
        case 'account':
            iconName='account-circle'
            break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}