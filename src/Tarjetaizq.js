/*
Representacion de una tarjeta 
*/

import React from 'react';

import estilos from './styles/estilos';
import { ScrollView, Text, TextInput, View, Image, ImageBackground, } from "react-native";

export default function Tarjetaizq(props){
    return(
    
            <View style={{flex:1, flexDirection: 'row'}}>
                <Image source={{uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/bird.jpg'}}
                style={{width: 100, 
                height: 100, 
                resizeMode: 'center', 
                alignSelf: 'center',    
                borderRadius: 70,
                margin: 10,
                flex: 1,
                
                }}/>

                <Image source={{uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/bird.jpg'}}
                style={{width: 100, 
                height: 100, 
                resizeMode: 'center', 
                alignSelf: 'center',    
                borderRadius: 70,
                margin: 10,
                flex: 1,
               
                }}/>
            </View>
     
        
    );
}

