import React from 'react';
import { StatusBar } from 'expo-status-bar';
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
import Slider from '@react-native-community/slider';
import RadioButtonRN from 'radio-buttons-react-native-expo';

import estilos from '../styles/estilos';
import colores from '../styles/colores';
import ProgressDialog from '../components/ProgressDialog';



import {AntDesign, FontAwesome5} from '@expo/vector-icons';

import firebase from '../backend/firebase';
import { set } from 'react-native-reanimated';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/

const EditarInfo = (props) => {

    const [stateEdit, setStateEdit] = React.useState({});

    const [progress, setProgess] = React.useState(false);

    const [valSlider, setValSlider] = React.useState(0);

    const opcionesRadioButton = [
        {  
            label: 'Masculino',
        },
        {
            label: 'Femenino',
        },
        {
            label: 'Prefiero no seleccionar',
        },

       
       
    ];

    const consulta = async () => {
        setProgess(true);
        try{
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
                          
            query.docs.forEach(async (user) => {	        
                setStateEdit(user.data());
                setValSlider(user.data().edad);                        
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
    
    const consultaUp = async () => {
        setProgess(true);
        try{
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
                          
            query.docs.forEach(async (user) => {	        
                const docUsuario = firebase.database.collection('users').doc(user.id);
                docUsuario.update(stateEdit);
            });
            props.navigation.replace('tabs');
            Alert.alert(
				'¡Listo!',
				'Datos actualizados con éxito', 
			);
            setProgess(false);
        }
        catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert(
				'Ocurrió un error',
				'Se requiere recargar los datos', 
			);
            setProgess(false);
        }                           
    };
    
    const handleChangeText = (name, value) => {
        setStateEdit({...stateEdit, [name]: value});
    };

    React.useEffect(() => {
        consulta();
    }, []);
    

    return (

        <>
            {progress && <ProgressDialog />}

                <ScrollView style={{backgroundColor: '#302c3c'}}>

                    <View  style={{flex: 1, marginTop: 25}}>

                        <Image
                            source={{
                                uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'center',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 500,
                            }}
                        />

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
                                        value={stateEdit.nickName}
                                        placeholder='Nickname'
                                        placeholderTextColor={colores.grisecito}
                                        keyboardType='default'
                                        //Evitamos la primera letra  mayúscula
                                        autoCapitalize='none'
                                            //Evitamos la corrección de palabras
                                        autoCorrect={false}
                                        onChangeText={(value) =>  handleChangeText('nickName', value)}
                                    />
                        </View>
                
                        <View
                            /*Aquí importamos los view y centramos los componentes que esten dentro del mismo*/
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >

                            <View style={{flex: 2}}>

                                <Text style={{ color: 'white',
                                            marginTop: 5,
                                            fontSize: 24,
                                            margin: 10,
                                            
                                }}>
                                    Edad: {valSlider} años
                                </Text>

                                <Slider
                                    marginHorizontal={-90}
                                    minimumValue={15}
                                    maximumValue={90}   
                                    value={valSlider}
                                    step={1}
                                    minimumTrackTintColor={'#FBE212'}
                                    maximumTrackTintColor={colores.pinkPurple}
                                    thumbTintColor={'#FBE212'}

                                    /*Guardamos el valor del slider en su state */
                                    onValueChange={(value) => {handleChangeText('edad', value), setValSlider(value)} }
                                />

                            </View>

                        
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                
                                }}
                            >



                                <View style={{flex: 3, margin: 20, marginTop: 20}}>

                                    <View style={{ paddingHorizontal: 8 }}>

                                    <Text style={{color: 'white', fontSize: 20}}>
                                            Tu sexo actual es: {stateEdit.sexo}
                                    </Text>

                                        <Text style={{color: 'white',}}>
                                            
                                        </Text>
                                            <RadioButtonRN
                                                data={opcionesRadioButton}
                                                icon={
                                                    <FontAwesome5 name='check' size={22} color={colores.vividSkyBlue} />
                                                }
                                                deactiveColor = {colores.pinkPurple}
                                                boxDeactiveBgColor = '#03a9f440'
                                                textColor = '#fff'
                                                /*Guardamos en valRadio el objeto del RadioButton seleccionado*/
                                                selectedBtn={(value) => {handleChangeText('sexo', value.label)} }

                                            />
                                    </View>

                                
                                    <TouchableOpacity
                                            style={{
                                                backgroundColor: '#47170F80',
                                                width: 200,
                                                height: 75,
                                                margin: 10,
                                                marginTop: 40,
                                                marginLeft: 40,
                                                textAlign: 'center',
                                                padding: 20,
                                                borderRadius: 40,
                                                borderWidth: 2,
                                                borderColor: '#F6CE15',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => {consultaUp();}}
                                    >
                                            <Text
                                                style={{
                                                    color: '#F6CE15',
                                                    marginTop: 5,
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Guardar cambios
                                            </Text>
                                    </TouchableOpacity>
                                </View>    
                            </View>

                        </View>
                    </View>
                </ScrollView>
            <StatusBar style='inverted'/> 
        </>  
    );
};

export default EditarInfo;
