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
const InterEditInfo = (props) => {

    const [progress, setProgess] = React.useState(false);

    const [stateEdit, setStateEdit] = React.useState({});

    const consulta = async () => {
        setProgess(true);
        try{
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
                          
            query.docs.forEach(async (user) => {	        
                setStateEdit(user.data());
            });
            setProgess(false);
        }
        catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert(
				'Ocurrió un error',
				'Se requiere recargar los datos', 
                [{text: 'Ok', onPress: () => consulta()}]
			);
            setProgess(false);
        }
              
    };

   
    React.useEffect(() => {
        consulta();
    }, []);


    return (
        <ScrollView style={{backgroundColor: '#302c3c'}}>
            <View
                /*
Aquí importamos los view y centramos los componentes que esten dentro del mismo
*/
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
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
                    ¿Qué deseas modificar?
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
                        props.navigation.navigate('EditarIn');
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
                        Mis datos generales
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    /*
A través de un TouchableOpacity diseñamos el boton para registrarse
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
                        props.navigation.navigate('editarubi', {...stateEdit});
                        
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
                        Mi ubicación 
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
        </ScrollView>
    );
};

export default InterEditInfo;
