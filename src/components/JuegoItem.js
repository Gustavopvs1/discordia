import React from 'react';
import {
	Alert,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
    Image
} from 'react-native';
import colores from '../styles/colores';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import firebase from '../backend/firebase';

/*
Componente para documento de la colección mascotas
*/
const JuegoItem = (props) => {

	console.log(props);
	const navigation = useNavigation();

	// Función para eliminar un documento
	// a partir de su id
	const eliminarJueg = async () => {
		console.log([props.indice]);
		Alert.alert(
			
			`Eliminar juego`,
			'¿Desea eliminar este juego de tu lista?',
			[
				{
					
					text: 'Eliminar',
					onPress: async () => {
						props.setProgress(true); 

						const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();

						query.docs.forEach(
							async user  =>  {
							try{
								const docUsuario = await firebase.database.collection('users').doc(user.id).update({juegos: firebase.firebase.firestore.FieldValue.arrayRemove(props.juego.nombre[props.indice])})
							}
							catch(exception){
								console.log(exception);
							}
						})

						props.consulta();
						props.setProgress(false);
					},
					style: 'destructive',
				},
				{
					text: 'Cancelar',
				},
			],
			{ cancelable: false }
		);
	};

	return (
        
		<View style={{flex: 1}}>
            <TouchableOpacity 
				style={{margin: 8, marginHorizontal:  20, padding: 10, backgroundColor: '#571D6A', borderColor: '#b5179e', borderRadius: 8,}}
				onPress={eliminarJueg}
			>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 10, alignContent: 'center', marginTop: 15, marginStart: 3}}>

                                    <Entypo name="circle-with-cross" size={24} color="#fff" />

                                </View>
                                <View style={{flex: 70, alignContent: 'flex-start', marginTop: 13}}>
                                    <Text style={{fontSize: 18, textAlign: 'center' ,color: '#fff', alignSelf: 'flex-start'}}>
                                        
                                        {'  '}
                                        {props.juego.nombre}
                                    </Text>
                                </View>
                                <View style={{flex: 20}}>
                                    <Image
                                            source={{
                                                uri: 'https://image.api.playstation.com/vulcan/img/rnd/202112/0508/9SK4qg9A0A94chx1WCp32UEh.png',
                                            }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: 'stretch',
                                                borderRadius: 25
                                            }}
                                    />
                                </View> 
                                
                            </View>
            </TouchableOpacity>
            
                        
		</View>
	);
};

export default JuegoItem;