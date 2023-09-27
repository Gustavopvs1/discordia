import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, TextInput, Alert, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../backend/firebase';
import ProgressDialog from '../components/ProgressDialog';
import estilos from '../styles/estilos';
import colores from '../styles/colores';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const CrearPubl = (props) => {

    const [progress, setProgress] = React.useState(false);

    const [nick, setNick] = React.useState('');

  /*  const [mascota, setMascota] = React.useState({
		nombre: null,
		raza: null,
		foto: 'https://firebasestorage.googleapis.com/v0/b/moysc-3bb75.appspot.com/o/defauluser.png?alt=media&token=96c3e0fe-7771-4392-b7b0-430aa35d0da1',
		imagenNueva: false,
	});*/

    const [publicacion, setPublicacion] = React.useState({
        fuuid: "",
        text: "",
        foto: 'https://firebasestorage.googleapis.com/v0/b/moysc-3bb75.appspot.com/o/defaultpubl.png?alt=media&token=39427d7f-8dca-47e8-bf6c-e8643b3948b5',
		imagenNueva: false,
    });

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
				setPublicacion({
					...publicacion,
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
				setPublicacion({
					...publicacion,
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

    const agregarPublica = async () => {
		setProgress(true);

		try {
			// Si se tomó una foto o se seleccionó de la galería
			// primero subimos la foto
			if (publicacion.imagenNueva) {
				/*
                NOTA:
                Asegúrate de agregar storage a los servicios de 
                firebase
                */

				//Generar la cadena binaria del archivo
				//BLOB
				const blob = await (
					await fetch(publicacion.foto)
				).blob();

				/*
                Generamos un file para FireStore 
                usando 3 parámetros
                1.- Contenido binario
                2.- nombre del archivo
                3.- config (tipo de archivo MIME)
                */
				const filePublicacion = new File(
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
					.child('publicaciones')
					.child(filePublicacion.name)
					.put(filePublicacion, filePublicacion.type);

				// Insertamos un nuevo documento
				await firebase.database
					.collection('publicaciones')
					.add({
                        
                        fuuid: firebase.auth.currentUser.uid, 
                        nickName: nick,
                        text: publicacion.text,
						foto: await subida.ref.getDownloadURL(),
					});
			} else {
				// Insertamos un nuevo documento
				await firebase.database
					.collection('publicaciones')
					.add({
                        fuuid: firebase.auth.currentUser.uid, 
                        nickName: nick,
                        text: publicacion.text,
						foto: publicacion.foto,
					});
			}

            props.navigation.replace('tabs');
			Alert.alert(
				'Listo',
				'Publicacion ralizada',
				[
					{
						text: 'Continuar',
						onPress: () =>{},
					},
				],
				{ cancelable: false }
			);
		} 
		catch (exception) {
			Alert.alert(
				'Ocurrió un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

   /* const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    };*/

    const consulta2 = async () => {
        setProgress(true);

        try {
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
            
            query.docs.forEach(async (user) => {	        
                    setNick(user.data().nickName);                       
            });
            setProgress(false);

        } 
        catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert('Ocurrió un error', 'Se requiere recargar los datos');
            setProgress(false);
        }
    };


    React.useEffect(() => {
        consulta2();
    }, []);

    return (

        <>
        {progress && <ProgressDialog />} 
        <ImageBackground
            source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
            style={{ flex: 1 }}
        >
            <View style={{
                    flex: 35,
                    flexDirection: 'row',
                    borderBottomColor: '#b5179e',
                    borderBottomWidth: 2,
                    margin: 5,
                    padding: 8,
                }}
            >

                <TextInput
                    // Forma uno de sobreescribir estilos
                    style={{
                        ...estilos.textInputLineNick, marginTop: 33
                    }}
                    placeholder='¡Publica algo!'
                    placeholderTextColor={colores.grisecito}
                    keyboardType='default'
                    //Evitamos la primera letra  mayúscula
                    autoCapitalize='none'
                    //Evitamos la corrección de palabras
                    autoCorrect={false}
                    
                    onChangeText={(e) =>
                        setPublicacion({
                            ...publicacion,
                            ['text']: e,
                        })
                    }

                        />
            </View>

            <View style={{flex:65}}>
            <ScrollView>
				<ImageBackground
					source={{ uri: publicacion.foto }}
					style={{
						width: 128,
						height: 128,
						resizeMode: 'contain',
						marginVertical: 32,
						alignSelf: 'center',
						borderRadius: 16,
						overflow: 'hidden',
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
                                    Subir foto {'  '}      
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
                                    Subir foto {' '}
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



                        
			</ScrollView>
            </View>      

            <View style={{flex:20}}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <View style={{flex: 50}}>
                                </View>
                           
                                <View style={{flex: 50}}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#47170F80',
                                            width: 120,
                                            height: 60,
                                            margin: 10,
                                            marginTop: 15,
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            borderColor: '#F6CE15',
                                            alignSelf: 'center'
                                        }}
                                        onPress={() => {agregarPublica()}}
                                    >
                                        <Text
                                            style={{
                                                color: '\#F6CE15',
                                                marginTop: -2,
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                alignSelf: 'center'
                                            }}
                                        >
                                            Publicar
                                        </Text>
                                    </TouchableOpacity>       
                                </View>       
                            </View>
            </View>

                 
        
        </ImageBackground>
        </>
    );
};

export default CrearPubl;
