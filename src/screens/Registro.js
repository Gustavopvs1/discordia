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


const Registro = (props) => {
    
    const [progress, setProgess] = React.useState(false);

    React.useEffect(() => {
		return () =>
			setUsuario({
                nickName: "",
                email: "",
                password: "", 
                password2: "", 
			});
	}, []);
    
    const [state1, setstate1] = React.useState({
        nickName: "",
        email: "",
        password: "", 
        password2: "",   
    });

    const handleChangeText = (name, value) => {
        setstate1({...state1, [name]: value});
    };

    const validacion = () =>{
        setProgess(true);

        if (state1.nickName === ""){
            Alert.alert('¡No tan rápido gamer!','Ingrese un nickname valido');
            setProgess(false);
        }
        else
        {
            if (state1.email === ""){
               Alert.alert('¡No tan rápido gamer!','Ingrese un correo electrónico valido');
               setProgess(false);
            }
            else{
                if (state1.password.length < 8){
                    Alert.alert('¡No tan rápido gamer!','Ingrese una contraseña con al menos 8 caracteres');
                    setProgess(false);
                }
                else{
                    if (state1.password != state1.password2  ){
                        Alert.alert('¡No tan rápido gamer!','Las contraseña ingresadas no son iguales');
                        setProgess(false);
                    }
                    else{
                        props.navigation.navigate('inforuser', {...state1});
                        setProgess(false);
                    }
                }
            }
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
                                width: 200,
                                height: 130,
                                resizeMode: 'center',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 500,
                            }}
                        />

                        <Text
                            style={{
                                color: 'white',
                                marginTop: 5,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >
                            ¡Registrate!
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
                                placeholder='Nickname'
                                placeholderTextColor={colores.grisecito}
                                keyboardType='default'
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                                onChangeText={(value) => handleChangeText('nickName', value)}
                            />
                        </View>

                        <View style={estilos.textInputIconContainer3}>
                            <AntDesign
                                name='mail'
                                size={25}
                                color={colores.pinkPurpleLi}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                // Forma uno de sobreescribir estilos
                                style={{
                                    ...estilos.textInputLineNick,
                                }}
                                placeholder='Correo electrónico'
                                placeholderTextColor={colores.grisecito}
                                keyboardType='email-address'
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                                onChangeText={(value) => handleChangeText('email', value)}
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
                                secureTextEntry={true}
                                placeholder='Contraseña'
                                placeholderTextColor={colores.grisecito}
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                                onChangeText={(value) => handleChangeText('password', value)}
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
                                secureTextEntry={true}
                                placeholder='Confirmar contraseña'
                                placeholderTextColor={colores.grisecito}
                                //Evitamos la primera letra  mayúscula
                                autoCapitalize='none'
                                //Evitamos la corrección de palabras
                                autoCorrect={false}
                                onChangeText={(value) => handleChangeText('password2', value)}
                            />
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#47170F80',
                                width: 175,
                                height: 50,
                                margin: 2,
                                textAlign: 'center',
                                padding: 8,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#F6CE15',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                                onPress={() => {validacion()}}
                        >
                            <Text
                                style={{
                                    color: '#F6CE15',
                                    marginTop: 5,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}
                            >
                                Siguiente
                            </Text>
                            
                        </TouchableOpacity>
                      
                      {/*
                        <Text
                            style={{
                                color: 'white',
                                marginTop: 5,
                                fontSize: 13,
                                margin: 10,
                            }}
                        >
                            O a través de
                        </Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FFFF',
                                width: 175,
                                height: 50,
                                margin: 2,
                                textAlign: 'center',
                                padding: 8,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#D50000',
                                alignItems: 'center',
                            }}
                            onPress={() => {}}
                        >
                            <Text
                                style={{
                                    color: '#0079D5',
                                    marginTop: 5,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}
                            >
                                Google
                            </Text>
                        </TouchableOpacity>
                            */}

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

export default Registro;
