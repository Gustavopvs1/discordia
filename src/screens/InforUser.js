import { StatusBar } from 'expo-status-bar';
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

import RadioButtonRN from 'radio-buttons-react-native-expo';

import estilos from '../styles/estilos';

import colores from '../styles/colores';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/

import firebase from '../backend/firebase';
const InforUser = (props) => {

     
    const [state2, setState] = React.useState(props.route.params);

    const handleChangeText = (name, value) => {
        setState({...state2, [name]: value});
    };

    React.useEffect(() => {
        setState({...state2, ['edad']: 22});
    }, []);

    /*Valor del slider*/
	const [valSlider, setValSlider] = React.useState(22);
  
    const opcionesRadioButton = [
        {
            value: 'Masculino',
            label: 'Masculino',
        },
        {
            value: 'Femenino',
            label: 'Femenino',
        },
        {
            value: 'Prefiero no seleccionar',
            label: 'Prefiero no seleccionar',
        },
    ];


    const validacion = () =>{
        
        if (state2.edad === ""){
            Alert.alert('¡No tan rápido gamer!','Ingrese una edad valida');
            
        }
        else
        {
            if (state2.sexo){
                {props.navigation.navigate('selecjue', {...state2}); }  
            }
            else{
                Alert.alert('¡No tan rápido gamer!','Elije una opción valida en el campo sexo');  
            }
                            
        }
        
    };
    
    


    return (
        
        <ImageBackground

            source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
            style={{ flex: 1 }}
        >
                <ScrollView>
            
                    <View
                        /*Aquí importamos los view y centramos los componentes que esten dentro del mismo*/
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                        <View
                            style={{
                                flex: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 25
                            }}
                        >

                            <Image
                                source={{
                                    uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/iconomoy.png',
                                }}
                                style={{
                                    width: 250,
                                    height: 170,
                                    resizeMode: 'center',
                                    alignSelf: 'center',
                                    marginTop: 32,
                                    borderRadius: 500,
                                }}
                            />

                            <Text
                                /*Aquí importamos los textos y los definimos en un sector especifico del mismo*/
                                style={{
                                    color: 'white',
                                    marginTop: 5,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >
                                Cuéntanos algo sobre ti
                            </Text>


                        </View>

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
                                    <Text style={{color: 'white',}}>
                                        Sexo
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
					                        selectedBtn={(value) => {handleChangeText('sexo', value)} }

                                        />
                                </View>

                            
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
                                        onPress={() => {validacion()}}
                                >
                                        <Text
                                            style={{
                                                color: '#F6CE15',
                                                marginTop: 5,
                                                fontSize: 17,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Siguente
                                        </Text>
                                </TouchableOpacity>
                            </View>    
                        </View>

                    </View>
                </ScrollView>
            <StatusBar style='inverted'/> 
        </ImageBackground>
        
    );
};

export default InforUser;
