import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Button,
} from 'react-native';
import colores from '../styles/colores';

import firebase from '../backend/firebase';

const LogorSingScreen = (props) => {


    return (
        <ImageBackground
            /*
Aquí importamos las imagenes y la declaramos como background para la pantalla
*/
            source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
            style={{ flex: 1 }}
        >
            <View
                /*
Aquí importamos los view y centramos los componentes que esten dentro del mismo
*/
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                ></View>

                <Image
                    source={{
                        uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/iconomoy.png',
                    }}
                    style={{
                        width: 250,
                        height: 220,
                        resizeMode: 'center',
                        alignSelf: 'center',
                        marginTop: 40,
                        borderRadius: 500,
                    }}
                />

                <Text
                    /*
Aquí importamos los textos y los definimos en un sector especifico del mismo
*/
                    style={{
                        color: 'white',
                        marginTop: 0,
                        fontSize: 20,
                        margin: 10,
                    }}
                >
                    ¡Conoce a Gamers en linea!
                </Text>

                <TouchableOpacity
                    /*
A través de un TouchableOpacity diseñamos el boton de iniciar sesion
*/
                    style={{
                        backgroundColor: '#7209b770',
                        width: 200,
                        height: 75,
                        margin: 10,
                        marginTop: 20,
                        textAlign: 'center',
                        padding: 20,
                        borderRadius: 40,
                        borderWidth: 2,
                        borderColor: '#b5179e',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        props.navigation.navigate('Inicio de Sesion');
                    }}
                >
                    <Text
                        style={{
                            color: '#f72585',
                            marginTop: 5,
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        Inicio Sesion
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    /*
A través de un TouchableOpacity diseñamos el boton para registrarse
*/
                    style={{
                        backgroundColor: '#47170F80',
                        width: 200,
                        height: 75,
                        margin: 10,
                        textAlign: 'center',
                        padding: 20,
                        borderRadius: 40,
                        borderWidth: 2,
                        borderColor: '#F6CE15',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        props.navigation.navigate('Registrar');
                    }}
                >
                    <Text
                        style={{
                            color: '#F6CE15',
                            marginTop: 5,
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        Registro
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colores.darkBlue,
                    }}
                >
                  
                </View>
            </View>
            <StatusBar style='inverted' />
        </ImageBackground>
    );
};

export default LogorSingScreen;
