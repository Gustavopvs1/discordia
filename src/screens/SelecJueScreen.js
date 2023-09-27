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
} from 'react-native';

import CheckBox from 'expo-checkbox';

import estilos from '../styles/estilos';

import colores from '../styles/colores';



const SelecJueScreen = (props) => {

    

    const [state3, setState] = React.useState(props.route.params);
    const [state10, setState10] = React.useState();
    const [collec, setCollec] = React.useState([]);

    const handleChangeText = (name, value) => {
        setState({...state3, [name]: value});
    };

    const handelChageCollec = (valCheck, gamename) => {

        switch (valCheck) {
            case true:
                setState10({...collec.push(gamename)});
            break;

            default:
   
                  for(let i=0; i<collec.length; i++)
                  {
                     if(gamename == collec[i])
                      {
                       collec.splice(i, 1);
                      }           
                   }
                
            break;         
          }

          handleChangeText('juegos', collec);

    };

    const [valCheck1, setValCheck1] = React.useState(false);
    const [valCheck2, setValCheck2] = React.useState(false);
    const [valCheck3, setValCheck3] = React.useState(false);
    const [valCheck4, setValCheck4] = React.useState(false);
    const [valCheck5, setValCheck5] = React.useState(false);
    const [valCheck6, setValCheck6] = React.useState(false);
    const [valCheck7, setValCheck7] = React.useState(false);
    const [valCheck8, setValCheck8] = React.useState(false);

    const validacion = () =>{
        
        if (state3.juegos === []){
            Alert.alert('¡No tan rápido gamer!','Elige al menos una opción ');
        }
        else
        {
            {props.navigation.navigate('agregar-ubi', {...state3}); }                            
        }
        
    };


    return (
        <ImageBackground
            source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 3, alignItems: 'center' }}>
                        <Text
                            /*Aquí importamos los textos y los definimos en un sector especifico del mismo*/
                            style={{
                                color: 'white',
                                marginTop: 70,
                                fontSize: 20,
                                margin: 8,
                            }}
                        >
                            ¡Elige al menos un juego con el quieras conocer
                            personas!
                        </Text>

                        <TouchableOpacity

                            style={{
                                backgroundColor: '#47170F80',
                                width: 140,
                                height: 50,
                                margin: 10,
                                marginTop: 10,
                                padding: 10,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#F6CE15',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {validacion()}}
                        >
                            <Text
                                style={{
                                    color: '#F6CE15',
                                    marginTop: 2,
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                }}
                            >
                                Enviar
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 8 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {/*Para utilizar un icono debes de generar 
                                un componente de la familia especificada y
                                agregar el nombre del icono, su tamanio y color
                                como props (name, size, color)
                                un icono puede aparecer directo como componente 
                                individual, como parte de un texto o dentro de un 
                                Touchable
                                (un boton tipo button no soporta icnos de manera nativa)*/}

                            {/*Existe un comoponente generico para definir
                            el evento clik (touch) que es 100% personalizable
                            <TouchableOpacity> es solo un contenedor como un canvas 
                            que por defecto reacciona cuando se selcciona, pero no cuenta
                            con ninguna especificacion de disenio (tu tienes que hacer tu estilo
                            de boton)*/}

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck1(!valCheck1), handelChageCollec(!valCheck1, 'Free-fire')}}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://animal.mx/wp-content/uploads/2022/01/Free-Fire.jpg',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck1}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck1(value), handelChageCollec(value, 'Free-fire')}}
				                />

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck2(!valCheck2), handelChageCollec(!valCheck2, 'Fortnite')}}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://image.api.playstation.com/vulcan/img/rnd/202112/0508/9SK4qg9A0A94chx1WCp32UEh.png',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck2}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck2(value), handelChageCollec(value, 'Fortnite')}}
				                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {/*Para utilizar un icono debes de generar 
                                un componente de la familia especificada y
                                agregar el nombre del icono, su tamanio y color
                                como props (name, size, color)
                                un icono puede aparecer directo como componente 
                                individual, como parte de un texto o dentro de un 
                                Touchable
                                (un boton tipo button no soporta icnos de manera nativa)*/}

                            {/*Existe un comoponente generico para definir
                            el evento clik (touch) que es 100% personalizable
                            <TouchableOpacity> es solo un contenedor como un canvas 
                            que por defecto reacciona cuando se selcciona, pero no cuenta
                            con ninguna especificacion de disenio (tu tienes que hacer tu estilo
                            de boton)*/}

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck3(!valCheck3), handelChageCollec(!valCheck3, 'GTA 5')}}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://fotografias-neox.atresmedia.com/clipping/cmsimages02/2016/08/30/F1311F3B-298C-42B7-9D70-DD40576FAFC1/98.jpg?crop=624,351,x10,y0&width=1900&height=1069&optimize=high&format=webply',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck3}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck3(value), handelChageCollec(value, 'GTA 5')}}
				                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck4(!valCheck4), handelChageCollec(!valCheck4, 'Minecraft')}}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/12a0ed7c6bc09b73d6558c6f69ed7f5f.png',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck4}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck4(value), handelChageCollec(value, 'Minecraft')}}
				                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck5(!valCheck5), handelChageCollec(!valCheck5, 'League of Legends')}}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://fotografias-neox.atresmedia.com/clipping/cmsimages01/2014/01/20/830E45A7-FA0B-408B-84D9-677E25FFAA7F/98.jpg?crop=768,432,x16,y0&width=1900&height=1069&optimize=high&format=webply',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                
                                <CheckBox
					                value={valCheck5}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck5(value), handelChageCollec(value, 'League of Legends')}}
				                />
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck6(!valCheck6), handelChageCollec(!valCheck6, 'COD War Zone')}}
                            >
                                <View View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://storage.qoo-static.com/game/12728/Edepu9gNdkLWAdRuxZi9OUwsUfdek8tV.jpg',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck6}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck6(value), handelChageCollec(value, 'COD War Zone')}}
				                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck7(!valCheck7), handelChageCollec(!valCheck7, 'Valorant')}}
                            >
                                <View View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://fondosmil.com/fondo/54287.jpg',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>
                                <CheckBox
					                value={valCheck7}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck7(value), handelChageCollec(value, 'Valorant')}}
				                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#1e1c77',
                                    width: null,
                                    height: null,
                                    marginVertical: 0,
                                    textAlign: 'center',
                                    padding: 20,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                onPress={() => {setValCheck8(!valCheck8), handelChageCollec(!valCheck8, 'Counter-Strike: Global Offensive')}}
                            >
                                <View View style={{ flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: 'https://http2.mlstatic.com/D_NQ_NP_909580-MLA41209729936_032020-V.jpg',
                                        }}
                                        style={{
                                            width: 180,
                                            height: 138,
                                            resizeMode: 'stretch',
                                            marginTop: -20,
                                        }}
                                    />
                                </View>

                                <CheckBox
					                value={valCheck8}
                                    marginTop={8}
                                    margin={-8}
					                color={'#b5179e'}
					                onValueChange={(value) => {setValCheck8(value), handelChageCollec(value, 'Counter-Strike: Global Offensive')}}
				                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <StatusBar style='inverted' />
            </ScrollView>
        </ImageBackground>
    );
};

export default SelecJueScreen;
