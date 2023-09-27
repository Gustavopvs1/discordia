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

const MenuScreen = (props) => {

    	/*
    En cuanto se cargue el componente verificamos si exoste una sesión 
    activa
    */
	React.useEffect(() => {
		checkLoginFirebase();
	}, []);

	const checkLoginFirebase = async () => {
		/*
        Si existe un cambio en el estatus de la sesión 
        direccionamos al screen correspondiente 
        */
		firebase.auth.onAuthStateChanged((user) => {
			if (user !== null) {
				props.navigation.replace('tabs');
			} else {
				props.navigation.replace('logorsing');
			}
		});
	};


    return (
        <ImageBackground
            /*
Aquí importamos las imagenes y la declaramos como background para la pantalla
*/
            source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
            style={{ flex: 1 }}
        >
            <View

                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        marginTop: 5,
                        fontSize: 20,
                        margin: 10,
                        }}
                >
                    Espere un segundo ...
                </Text>
            </View>
            <StatusBar style='inverted' />
        </ImageBackground>
    );
};

export default MenuScreen;
