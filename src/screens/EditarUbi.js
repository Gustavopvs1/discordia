import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import estilos from '../styles/estilos';
import {AntDesign, Entypo} from '@expo/vector-icons'
import colores from '../styles/colores';

import ProgressDialog from '../components/ProgressDialog';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import firebase from '../backend/firebase';

/*Servicios de ubicacion */
import * as Location from 'expo-location';




const EditarUbi = (props) => {


    const [stateEdit, setStateEdit] = React.useState(props.route.params);

    const [progress, setProgess] = React.useState(false);
 
    const consultaUp = async () => {
        setProgess(true);
        try{
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
                          
            query.docs.forEach(async (user) => {	        
                const docUsuario = firebase.database.collection('users').doc(user.id);
                docUsuario.update(stateEdit);
            });
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

    React.useEffect(() =>{
        Location.setGoogleApiKey('AIzaSyBhmLLZAYkuEe-HhfWxpw5wgv2qtbRVy5w');
        },
    []);    

    /* State que controle la visibilidad de nuestro ProgressDialog */
    const [showProgress, setShowProgress] = React.useState(false);

    /*Creamos un estado con los valores de la ubicacion */
    const [ubicacion2,setUbicacion2] = React.useState({
        direccion: stateEdit.ubicacion.direccion,
        latitud: stateEdit.ubicacion.latitud,
        longitud: stateEdit.ubicacion.longitud
    });

    /*Creamos un state a nuestro mapa para poder actualilzarlo desde fuera del MapView */
    const [mapa,setMapa] = React.useState(null);

    /*Funcion para obtener una direccion desde una ubicacion */
    const getDireccionFromUbicacion = async (latitud, longitud) =>{

        setShowProgress(true);

        try{
            /*GoogleMaps intente buscar el punto con la direccion mas exacta que pueda,
                sin embargo, algunos lugares tiene mas de una direccion */
            const direcciones = await Location.reverseGeocodeAsync({
                latitude: latitud,
                longitude: longitud
            }, {
                useGoogleMaps: true,
            }

            );

            const direccion = `${direcciones[0].name}, ${direcciones[0].district}, ${direcciones[0].city}, ${direcciones[0].region}. C.P ${direcciones[0].postalCode}`

            //Actuzalizamos el objeto de ubicaciones
            setUbicacion2({
                latitud: latitud,
                longitud: longitud,
                direccion: direccion
            });

            //Mover el marcador al la nueva direcion
            mapa.animateToRegion({
                latitude: latitud,
                longitude: longitud,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03 
            });
            
            handleChangeUbi(     
                {
                    direccion: direccion,
                    latitud: latitud,
                    longitud: longitud
                }
            );
            setShowProgress(false);

        }
        catch (exception){
            setShowProgress(false);
            console.log('Error', exception);
        }

    };

    /*Funcion para ingresar en el Textinput una direccion y que
         obtenga la ubicacion */

    const getUbicacionFromDireccion = async (direccion) => {
            
            setShowProgress(true);

            try{
                
                /*Tomamos las posibles ubicaciones */
                const ubicaciones = await Location.geocodeAsync(direccion, {useGoogleMaps: true});

                /*Actulizamos la ubicacion actual y movemos el mapa*/
                setUbicacion2({
                    latitud: ubicaciones[0].latitude,
                    longitud: ubicaciones[0].longitude,
                    direccion: direccion
                });

                mapa.animateToRegion({
                    latitude: ubicaciones[0].latitude,
                    longitude: ubicaciones[0].longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03
                });

                handleChangeUbi(     
                    {
                        direccion: direccion,
                        latitud: ubicaciones[0].latitude,
                        longitud: ubicaciones[0].longitude
                    }
                );

                setShowProgress(false);
            }
            catch(exception){
                setShowProgress(false);
                console.log('Error', exception)
            } 
    };

    const handleChangeUbi = (ubicacion) => {
        setStateEdit({...stateEdit, ubicacion});
    };


    return(
        
        <ImageBackground

        source={{ uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/back.png' }}
        style={{ flex: 1 }}
        >
            
            <View style={{flex: 1}}>

                {showProgress && <ProgressDialog />} 
                
                <ScrollView style={{flex: 1}}>
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 30,
                            marginTop: 23
                        }}
                    >
                        <Text style={{color: 'white', marginTop: 5, fontSize: 34, margin: 10,}}>
                            ¿Cuál es tu ubicación?
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{...estilos.textInputIconContainer3, alignItems: 'center'}}>
                            <Entypo
                                name='address'
                                size={25}
                                color={'#F6CE15'}
                            />
                            <TextInput
                                // Forma uno de sobreescribir estilos
                                style={{
                                    ...estilos.textInputIcon,
                                    ...estilos.textInputLineNick,
                                }}
                                value={ubicacion2.direccion}
                                placeholder='Dirección'
                                placeholderTextColor={colores.grisecito}
                                keyboardType='twitter'
                                autoCapitalize='sentences'
                                autoCorrect={true}
                                multiline
                                onChangeText={(e) => {setUbicacion2({
                                    ...ubicacion2, ['direccion']: e,
                                })}}
                            />
                            <TouchableOpacity
                                        style={{
                                            backgroundColor: '#7209b770',
                                            width: 65,
                                            height: 65,
                                            margin: 2,
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            borderColor: '#F728D8',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => { getUbicacionFromDireccion(ubicacion2.direccion)}}
                            >
                                    <Entypo
                                        name='magnifying-glass'
                                        size={22}
                                        color={'#F728D8'}
                                        
                                    />

                            </TouchableOpacity>
                        </View>


                    </View>

                        <View style={estilos.textInputIconContainer3}>
                            <Entypo
                                name='location-pin'
                                size={25}
                                color={'#F6CE15'}
                            />
                            <Text style={{...estilos.textInputIcon, ...estilos.textInputIconLine,}}>
                                Lat: {ubicacion2.latitud}
                            </Text>
                        </View>

                        <View style={estilos.textInputIconContainer3}>
                            <Entypo
                                name='location-pin'
                                size={25}
                                color={'#F6CE15'}
                            />
                            <Text style={{...estilos.textInputIcon, ...estilos.textInputIconLine,}}>
                                Lng: {ubicacion2.longitud}
                            </Text>
                        </View>

                        <TouchableOpacity
                                        style={{
                                            backgroundColor: '#47170F80',
                                            width: 200,
                                            height: 75,
                                            margin: 10,
                                            marginTop: 17,
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            borderColor: '#F6CE15',
                                            alignItems: 'center',
                                            alignSelf: 'center'
                                        }}
                                        onPress={() => {consultaUp();}}
                                >
                                        <Text
                                            style={{
                                                color: '#F6CE15',
                                                marginTop: 5,
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Guardar cambios
                                        </Text>
                        </TouchableOpacity>       
                        
                </ScrollView>
               
                <View  style={{flex: 1,borderRadius: 20}}>
                    {/*Mapa para visualizar las direcciones */}
                    <MapView style={{flex:1}}
                            /*Inicializamos el state del mapa */
                            ref={(map) => setMapa(map)}
                            zoomControlEnabled
                            zoomEnabled
                            zoomTapEnabled
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: ubicacion2.latitud,
                                longitude: ubicacion2.longitud,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05
                            }}  
                    >
                        <Marker coordinate={{
                                                latitude: ubicacion2.latitud,
                                                longitude: ubicacion2.longitud,
                                            }}
                                
                                description={ubicacion2.description}
                                //Indicamos que este marcador se pueda mover
                                draggable
                                //Propiedad para cuando soltamos el marcador
                                onDragEnd={(e) => {

                                    const lat = e.nativeEvent.coordinate.latitude;
                                    const lng = e.nativeEvent.coordinate.longitude;
                                    

                                    //Tomar la direccion de este punto
                                    getDireccionFromUbicacion(lat, lng)
                                    
                                }}
                        />

                    </MapView>
                </View> 
            </View>
            
        </ImageBackground>
        
        
         
    );

}

export default EditarUbi;