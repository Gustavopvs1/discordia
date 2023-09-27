import React from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    Alert
} from 'react-native';

import estilos from '../styles/estilos';

import colores from '../styles/colores';
import { AntDesign } from '@expo/vector-icons';

import ProgressDialog from './../components/ProgressDialog';

import firebase from '../backend/firebase';

/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const InicioSesion = (props) => {

    const [progress, setProgess] = React.useState(false);

    /*
    State para los datos del inicio de sesión
    */
	const [usuario, setUsuario] = React.useState({
		correo: '',
		pass: '',
	});


    /*
    Creamos un efecto que regrese los valores 
    del state como al inicio cuando este screen 
    se quite d ela pantalla 
    */
	React.useEffect(() => {
		return () =>
			setUsuario({
				correo: '',
				pass: '',
			});
	}, []);

    const loginFirebase = async () => {
		setProgess(true);
		/*
        Validaciones
        */
		if (
			usuario.correo.length < 5 ||
			usuario.pass.length < 8
		) {
			Alert.alert(
				'¡No tan rápido gamer!',
				'Correo o contraseña inválidos'
			);
			setProgess(false);

			return;
		}

		try {
			/*
            Invocamos a la función de firebase 
            que busca un usuario por emial y contraseña
            */
			usuarioFirebase =
				await firebase.auth.signInWithEmailAndPassword(
					usuario.correo,
					usuario.pass
				);
			setProgess(false);

		
		} catch (exception) {
			console.log('Error', JSON.stringify(exception));
            Alert.alert(
				'¡No tan rápido gamer!',
				'Correo o contraseña inválidos'
			);
			setProgess(false);
		}
	};

    return (

        <>
            {progress && <ProgressDialog />} 
            <ImageBackground

                source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View
                        /* Aquí importamos los view y centramos los componentes que esten
                dentro del mismo */
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
                            style={{
                                color: 'white',
                                marginTop: 5,
                                fontSize: 20,
                                margin: 10,
                                marginBottom: 12
                            }}
                        >
                            ¡Inicia Sesión!
                        </Text>

                        <View style={estilos.textInputIconContainer3}>
                            <AntDesign
                                name='user'
                                size={25}
                                color={colores.pinkPurpleLi}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                // Forma uno de sobreescribir estilos
                                style={{
                                    ...estilos.textInputLineNick,
                                }}
                                onChangeText={(e) =>
                                    setUsuario({
                                        ...usuario,
                                        ['correo']: e,
                                    })
                                }
                                placeholder='Correo electrónico'
                                placeholderTextColor={colores.grisecito}
                                keyboardType='email-address'
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                            />
                        </View>

                        <View style={estilos.textInputIconContainer3}>
                            <AntDesign
                                name='key'
                                size={25}
                                color={colores.pinkPurpleLi}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                // Forma uno de sobreescribir estilos
                                style={{
                                    ...estilos.textInputLineNick,
                                }}
                                onChangeText={(e) =>
                                    setUsuario({
                                        ...usuario,
                                        ['pass']: e,
                                    })
                                }
                                placeholder='Contraseña'
                                secureTextEntry={true}
                                placeholderTextColor={colores.grisecito}
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            /*
    A través de un TouchableOpacity diseñamos el boton de iniciar sesion
    */
                            style={{
                                backgroundColor: '#47170F80',
                                width: 200,
                                height: 75,
                                margin: 10,
                                marginTop: 40,
                                textAlign: 'center',
                                padding: 20,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#F6CE15',
                                alignItems: 'center',
                            }}
                            onPress={() => loginFirebase()}
                        >
                            <Text
                                style={{
                                    color: '#F6CE15',
                                    marginTop: 5,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                            >
                                Entrar
                            </Text>
                        </TouchableOpacity>


                    {/*
                        <TouchableOpacity
 
                            style={{
                                backgroundColor: '#47170F80',
                                width: 200,
                                height: 75,
                                margin: 10,
                                marginTop: 40,
                                textAlign: 'center',
                                padding: 20,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#F6CE15',
                                alignItems: 'center',
                            }}
                            onPress={() => loginFirebase()}
                        >
                            <Text
                                style={{
                                    color: '#F6CE15',
                                    marginTop: 5,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                            >
                                Google
                            </Text>
                        </TouchableOpacity>*/}


                        <View
                            style={{
                                flex: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colores.darkBlue,
                            }}
                        ></View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default InicioSesion;
