import React from 'react';
import {
	Alert,
	Button,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	View,
} from 'react-native';

// Vinculamos el objeto de navegación actual
// a este screen
import {
	useNavigation,
	useFocusEffect,
} from '@react-navigation/native';

import ProgressDialog from '../components/ProgressDialog';

import * as ImagePicker from 'expo-image-picker';


import colores from '../styles/colores';
import estilos from '../styles/estilos';

import firebase from '../backend/firebase';

import {FontAwesome5,MaterialIcons,Feather} from '@expo/vector-icons';

const EditarFoto = (props) => {
	//Creamos una constante de navegación
	const navigation = useNavigation();

    const [progress, setProgress] = React.useState(false);


    const perfilId = firebase.auth.currentUser.uid;

    const [perfil, setPerfil] = React.useState({
        fuuid: firebase.auth.currentUser.uid, 
        nickName: "",
        email: "",
        edad: "",
        sexo: "",
        juegos: [],
        ubicacion: {},
        foto: 'https://firebasestorage.googleapis.com/v0/b/moysc-3bb75.appspot.com/o/defaultpubl.png?alt=media&token=39427d7f-8dca-47e8-bf6c-e8643b3948b5'
	});


    useFocusEffect(
		React.useCallback(() => {
			getPerfil();
		}, [])
	);

    const getPerfil = async () => {
		const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();

		// Si existe el documento
		
            query.docs.forEach(async (user) => {

                setPerfil({
                    fuuid: user.data().fuuid, 
                    nickName: user.data().nickName,
                    email: user.data().email,
                    edad: user.data().edad,
                    sexo: user.data().sexo,
                    juegos: user.data().juegos,
                    ubicacion: user.data().ubicacion,
					foto: 'https://firebasestorage.googleapis.com/v0/b/moysc-3bb75.appspot.com/o/defaultpubl.png?alt=media&token=39427d7f-8dca-47e8-bf6c-e8643b3948b5',
                    imagenNueva: false,
                });
      
                      
            });

			setProgress(false);
		
	};

    const tomarFoto = async () => {
		setProgress(true);
		try {
			const { status } =
				await ImagePicker.requestCameraPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Error',
					'El permiso de la cámara es necesario para continuar'
				);

				return;
			}
			/*
            Lanzamos la cámara y la fotografía tomada
             */
			const imagenCamara =
				await ImagePicker.launchCameraAsync({
					// Tipo de elemento de la cámara (img / videos / todo)
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					// Permitimos la edición en función de la relación de aspecto
					allowsEditing: true,
					// Indicamos la relación de aspecto
					aspect: [1, 1],
					// Calidad de la imagen 0 ===> máxima compresión y 1 ===> máxima calidad
					quality: 0.5,
				});

			/*
            Revisamos si la imagen se tomó
            */
			if (!imagenCamara.cancelled) {
				setPerfil({
					...perfil,
					['foto']: imagenCamara.uri,
					['imagenNueva']: true,
				});
			}
		} catch (exception) {
			Alert.alert(
				'Ocurrio un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

    const seleccionarImagenGaleria = async () => {
		setProgress(true);
		try {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Error',
					'El permiso de la cámara es necesario para continuar'
				);

				return;
			}
			/*
            Tomamos una imagen de la galería
             */
			const imagenGaleria =
				await ImagePicker.launchImageLibraryAsync({
					// Tipo de elemento de la galería (img / videos / todo)
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					// Permitimos la edición en función de la relación de aspecto
					allowsEditing: true,
					// Indicamos la relación de aspecto
					aspect: [1, 1],
					// Calidad de la imagen 0 ===> máxima compresión y 1 ===> máxima calidad
					quality: 0.5,
				});

			/*
            Revisamos si la imagen se seleccionó
            */
			if (!imagenGaleria.cancelled) {
				setPerfil({
					...perfil,
					['foto']: imagenGaleria.uri,
					['imagenNueva']: true,
				});
			}
		} catch (exception) {
			Alert.alert(
				'Ocurrio un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

    const editarPerfil = async () => {
		setProgress(true);
		try {
			// Si se tomó una foto o se seleccionó de la galería
			// primero subimos la foto
			if (perfil.imagenNueva) {
				/*
                NOTA:
                Asegúrate de agregar storage a los servicios de 
                firebase
                */

				//Generar la cadena binaria del archivo
				//BLOB
				const blob = await (
					await fetch(perfil.foto)
				).blob();

				/*
                Generamos un file para FireStore 
                usando 3 parámetros
                1.- Contenido binario
                2.- nombre del archivo
                3.- config (tipo de archivo MIME)
                */
				const filePerfil = new File(
					[blob],
					`${
						firebase.auth.currentUser.uid
					}_${new Date().getTime()}.jpg`,
					{ type: 'image/jpeg' }
				);
				blob.close();

				/*
                Una vez creado el archivo, lo subimos a firestore storage
                la referencia a storage es desde la raíz
                ref() -------> Home de mi servicio
                child() -----> Referencia a un componente hijo
                put() -------> Crea un recurso en el servicio a partir de un blob
                */
				const subida = await firebase.storage
					.ref()
					.child('perfiles')
					.child(filePerfil.name)
					.put(filePerfil, filePerfil.type);

				// Editamos el documento
				await firebase.database
					.collection('users')
					.where('fuuid', '==', firebase.auth.currentUser.uid)
					.update({
                        fuuid: firebase.auth.currentUser.uid, 
                        nickName:  perfil.nickName,
                        email: perfil.email,
                        edad: perfil.edad,
                        sexo: perfil.sexo,
                        juegos: perfil.juegos,
                        ubicacion: perfil.ubicacion,
                        foto: await subida.ref.getDownloadURL(),
					});
			} else {
				// Editamos el documento
				await firebase.database
					.collection('users')
					.where('fuuid', '==', firebase.auth.currentUser.uid)
					.update({
                        fuuid: firebase.auth.currentUser.uid, 
                        nickName:  perfil.nickName,
                        email: perfil.email,
                        edad: perfil.edad,
                        sexo: perfil.sexo,
                        juegos: perfil.juegos,
                        ubicacion: perfil.ubicacion,
						foto: perfil.foto,
					});
			}

			Alert.alert(
				'Listo',
				'Publicación actualizada',
				[
					{
						text: 'Continuar',
						onPress: () =>
							props.navigation.navigate(
								'tabs'
							),
					},
				],
				{ cancelable: false }
			);
		} catch (exception) {
			Alert.alert(
				'Ocurrió un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

    

	return (
		<>
			{progress && <ProgressDialog />}
			<ScrollView style={{backgroundColor: '#302c3c'}}>
				<ImageBackground
					source={{ uri: perfil.foto }}
					style={{
						width: 128,
						height: 128,
						resizeMode: 'contain',
						marginVertical: 32,
						alignSelf: 'center',
						borderRadius: 64,
						overflow: 'hidden',
						backgroundColor:
							colores.chineseViolet,
					}}
				/>

				<View style={{flexDirection: 'row'}}>

                   <View style={{alignItems: 'center', marginStart: 8}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#7209b770',
                                width: 150,
                                height: 60,
                                margin: 10,
                                marginTop: 15,
                                textAlign: 'center',
                                padding: 20,
                                paddingBottom: -30,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#b5179e',
                                alignSelf: 'center'
                            }}
                            onPress={tomarFoto}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: -22
                                }}>

                                <Text
                                    style={{
                                        color: '#f72585',
                                        fontWeight: 'bold',
                                        
                                    }}>
                                    Cambiar foto {'  '}      
                                </Text>

                                
                                <MaterialIcons
                                    name='add-a-photo'
                                    color={'#F6CE15'}
                                    size={21}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#7209b770',
                                width: 150,
                                height: 60,
                                margin: 10,
                                marginTop: 15,
                                textAlign: 'center',
                                padding: 20,
                                paddingBottom: -30,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#b5179e',
                                alignSelf: 'center'
                            }}
                            onPress={seleccionarImagenGaleria}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: -22
                                }}>
    
                                <Text
                                    style={{
                                        color: '#f72585',
                                        marginStart: 4,
                                        fontWeight: 'bold',
                                    }}>
                                    Cambiar foto {' '}
                                </Text>

                                <MaterialIcons
                                    name='add-photo-alternate'
                                    color={'#F6CE15'}
                                    size={22}
                                />
                            </View>
                        </TouchableOpacity>
                   </View> 
                </View>

				<View
					style={{
						marginHorizontal: 8,
						marginVertical: 16,
                        alignItems: 'center'
					}}>

                    <TouchableOpacity
                        /*A través de un TouchableOpacity diseñamos el boton de iniciar sesion*/
                        style={{
                            backgroundColor: '#47170F80',
                            width: 200,
                            height: 75,
                            margin: 10,
                            marginTop: 20,
                            textAlign: 'center',
                            padding: 20,
                            borderRadius: 40,
                            borderWidth: 2,
                            borderColor: '#F6CE15',
                            alignItems: 'center',
                        }}
                        onPress={editarPerfil}
                    >
                        <Text
                            style={{
                                color: '#F6CE15',
                                marginTop: 5,
                                fontSize: 17,
                                fontWeight: 'bold',
                            }}
                        >
                            Guardar
                        </Text>
                    </TouchableOpacity>

				</View>	
				
				
			</ScrollView>
		</>
	);
};

export default EditarFoto;