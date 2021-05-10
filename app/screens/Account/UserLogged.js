import React from 'react'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import firebase from 'firebase'

export default function UserLogged(){
    return(
        <ScrollView>
            <View style={styles.viewcontainer}>
                <Text>UserLogged</Text>
                <Button title='Únete'
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnRegister}
                    title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 20,
        width: '95%'
        
    },
    btnRegister:{
        backgroundColor: '#b7657b'
    },
    viewcontainer:{
        alignItems: 'center'
    }
})