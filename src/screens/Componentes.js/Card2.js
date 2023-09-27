/*
Representacion de una tarjeta 
*/
import React from 'react';
import { Text, View, Image } from 'react-native';
import colores from '../../styles/colores';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
export default function Card2(props) {
    const imgAutor = props.imgAutorProp;
    const imgPost = props.imgPostProp;
    return (
        <View
            /* Aquí importamos los view y centramos los componentes que esten
    dentro del mismo */
            style={{
                backgroundColor: '#571D6A',
                borderRadius: 5,
                margin: 7,
                marginTop: 8,
            }}
        >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                    /*
Aquí importamos las imagenes y la declaramos como foto de perfil
*/
                    source={{
                        uri: imgPost,
                    }}
                    style={{
                        width: 80,
                        height: 50,
                        resizeMode: 'center',
                        margin: 20,
                        marginLeft: 15,
                        borderRadius: 10,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text
                        /*
Aquí importamos los textos y los definimos en un sector especifico del mismo
*/
                        style={{
                            flex: 1,
                            color: 'white',
                            marginTop: 16,
                            marginStart: 20,
                            fontSize: 20,
                            margin: 6,
                        }}
                    >
                        {props.textPost}
                    </Text>
                    <Text
                        style={{
                            flex: 5,
                            color: 'white',
                            marginStart: 20,
                            marginTop: 1,
                            fontSize: 15,
                            margin: 6,
                        }}
                    >
                        {props.textAutor}
                    </Text>
                </View>
            </View>
        </View>
    );
}
