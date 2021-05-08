import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'

export default function Loading(props){
    const { isVisible, text} = props
    return(

        <View style={[
            {
                flex: 1,
                justifyContent: 'center'
            },
            ]}>
            <View style={[
                {
                justifyContent: 'center',
                alignSelf: 'center',
                //backgroundColor: '·fff',
                //borderWidth: 1,
                //borderRadius: 10,
                //width: 200,
                //height: 150,
                //borderColor: '#b7657b',
                }
            ]}>
                <ActivityIndicator size='large' animating={true} color='#78c4d4'/>
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
        </View>
       
        //<Overlay 
        //    isVisible = {isVisible}           
        //    windowBackgroundColor = 'rgba(255, 255, 255, 1'
        //    overlayBackgroundColor = 'transparent'
        //    overlayStyle = {styles.overlay}>
        //
        //    <View>
        //        {<ActivityIndicator size='large' color='#78c4d4'/>}
        //        {text && <Text style={styles.text}>{text}</Text>}
        //    </View>
//
        //</Overlay>
    )

}

const styles = StyleSheet.create({
    overlay:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 50,
        width: 200,
        backgroundColor: '#ffffff',
        borderColor: '#b7657b',
        borderWidth: 2,
        borderRadius: 10,
        //paddingTop:50,
        //paddingBottom: 50
    
    },
    text:{
        color:'#78c4d4',
        textTransform: 'uppercase',
        marginTop: 10,
        //----------//
        fontSize: 30,
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
    }
})