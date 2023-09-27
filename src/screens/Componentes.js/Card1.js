/*
Representacion de una tarjeta 
*/
import React from 'react';
import { Text, View, Image } from 'react-native';
import colores from '../../styles/colores';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
export default function Card1(props) {
    const imgAutor = props.imgAutorProp;
    const imgPost = props.imgPostProp;
    return (
        <View
            /* Aquí importamos los view y centramos los componentes que esten
    dentro del mismo */
            style={{
                backgroundColor: '#7209b760',
                borderRadius: 20,
                margin: 7,
                marginTop: 12,
            }}
        >
            <View style={{ flex: 3 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 30 }}>
                        <Image
                            /*Aquí importamos las imagenes y la declaramos para la tarjeta
                            de presentacion que tendrá cada publicación*/
                            source={{ uri: imgAutor }}
                            style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'center',
                                margin: 10,
                                marginLeft: 27,
                                borderRadius: 800,
                            }}
                        />
                    </View>

                    <View style={{ flex: 70 }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                /*
Aquí importamos los textos y los definimos en un sector especifico del mismo
*/
                                style={{
                                    color: colores.grisecito,
                                    alignSelf: 'flex-start',
                                    marginLeft: -32,
                                    marginTop: 5,
                                }}
                            >
                                {props.textAutor}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color: colores.grisecito2,
                        alignSelf: 'flex-start',
                        marginLeft: 35,
                        margin: 5,
                    }}
                >
                    {props.textPost}
                </Text>
            </View>

            <View style={{ flex: 7 }}>
                <Image
                    source={{ uri: imgPost }}
                    style={{
                        width: 250,
                        height: 175,
                        marginStart: 25,
                        resizeMode: 'center',
                        marginTop: 5,
                        marginBottom: 12,
                        borderRadius: 20,
                    }}
                />
            </View>
        </View>
    );
}
