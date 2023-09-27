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
import { MaterialIcons, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import firebase from '../backend/firebase';

/*
Componente para documento de la colección mascotas
*/
const PubliItem = (props) => {

	const navigation = useNavigation();

	// Función para eliminar un documento
	// a partir de su id
	const eliminarPubli = async () => {
		Alert.alert(
			`¿Desea eliminar publicación ?`,
			'La publicación no podrá ser recuperada',
			[
				{
					
					text: 'Eliminar',
					onPress: async () => {
						props.setProgress(true);
						await firebase.database
							.collection('publicaciones')
							.doc(props.publi.id)
							.delete();
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
			         
                            
                            <View 
                                style={{margin: 8, marginHorizontal:  20, padding: 10, backgroundColor: '#7209b760', borderRadius: 8}}
                            >
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{flex: 30, alignContent: 'center', marginTop: 15, marginStart: 3, flexDirection: 'row'}}>

                                        <View style={{flex: 18}}>
                                            <Image
                                                        source={{
                                                            uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                                                        }}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            resizeMode: 'stretch',
                                                            borderRadius: 25,
                                                            alignSelf: 'flex-start'
                                                        }}
                                            />
                                        </View>

                                        <View style={{flex: 82}}>
                                            <Text style={{fontSize: 16, fontFamily: 'verdana',textAlign: 'center' , color: colores.grisecito, alignSelf: 'flex-start'}}>
                                                {'  '}
                                                {props.publi.nickName} 
                                            </Text>
                                        </View>        
                                    

                                    </View>
                                    <View style={{flex: 30, alignContent: 'flex-start', marginTop: 17}}>
                                        <Text style={{fontSize: 16, textAlign: 'center' ,color: '#fff', alignSelf: 'flex-start'}}>
                                            
                                            {'  '}
                                            {props.publi.text}
                                        </Text>
                                    </View>
                                    <View style={{flex: 40, marginTop: 5, alignContent: 'center', alignItems: 'center'}}>
                                        <Image
                                                source={{
                                                    uri: props.publi.foto,
                                                }}
                                                style={{
                                                    width: 250,
                                                    height: 250,
                                                    resizeMode: 'stretch',
                                                    borderRadius: 25
                                                }}
                                        />
                                    </View>
                                    <View style={{flex: 20, margin: 15, alignItems: 'flex-end', marginBottom: 5}}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* Boton para editar */}
                                            <TouchableOpacity
                                                // Enviamos como parámetro de navegación
                                                // el id del documento
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'editarpubl',
                                                        {
                                                            PublId: props.publi.id,
                                                        }
                                                    )
                                                }
                                                style={{
                                                    padding: 8,
                                                    backgroundColor: '#47170F80',
                                                    borderColor: '#F6CE15',
                                                    borderWidth: 2,
                                                    borderRadius: 8,
                                                    marginEnd: 8,
                                                }}>
                                                <Feather
                                                    name='edit-3'
                                                    size={21}
                                                    color={'#fff'}
                                                />
                                            </TouchableOpacity>

                                            {/* Boton para eliminar */}
                                            <TouchableOpacity
                                                style={{
                                                    padding: 8,
                                                    backgroundColor: '#7209b770',
                                                    borderRadius: 8,
                                                    borderColor: '#b5179e',
                                                    borderWidth: 2,
                                                    marginHorizontal: 12,
                                                    marginEnd: 8
                                                }}
                                                onPress={() => {eliminarPubli()}}>
                                                <MaterialIcons
                                                    name='delete-outline'
                                                    size={22}
                                                    color={'#FFF'}
                                                />
                                            </TouchableOpacity>
                                        </View> 
                                    </View>
                                    
                                </View>
                            </View>
                        
		</View>
	);
};

export default PubliItem;