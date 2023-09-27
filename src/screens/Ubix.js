import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../backend/firebase';
import { AntDesign, Entypo } from '@expo/vector-icons';
import colores from '../styles/colores';
import ProgressDialog from '../components/ProgressDialog';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const Ubix = (props) => {
    console.log(props.route.params);
    const [progress, setProgess] = React.useState(false);
    const [perfil, setPerfil] = React.useState(props.route.params);

    const [ubicacion2, setUbicacion2] = React.useState({
        direccion: perfil.ubicacion.direccion,
        latitud: perfil.ubicacion.latitud,
        longitud: perfil.ubicacion.longitud,
    });

    const [edad, setEdad] = React.useState('');
    const [nick, setNick] = React.useState('');
    const [sexo, setSexo] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [direc, setDirec] = React.useState('');
    const [lati, setLati] = React.useState('');
    const [long, setLong] = React.useState('');
    const [jueg, setJueg] = React.useState([]);

    const consulta = async () => {
        setProgess(true);

        try {
            const query = await firebase.database
                .collection('users')
                .where('fuuid', '==', perfil.fuuid)
                .get();
            query.docs.forEach(async (user) => {
                setNick(user.data().nickName);
                setEdad(user.data().edad);
                setSexo(user.data().sexo);
                setEmail(user.data().email);
                setDirec(user.data().ubicacion.direccion);
                setLati(user.data().ubicacion.latitud);
                setLong(user.data().ubicacion.longitud);
                setJueg(user.data().juegos);
            });
            setProgess(false);
        } catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert('Ocurrió un error', 'Se requiere recargar los datos', [
                { text: 'Ok', onPress: () => consulta() },
            ]);
            setProgess(false);
        }
    };

    React.useEffect(() => {
        consulta();
    }, []);
    React.useEffect(() => {
        Location.setGoogleApiKey('AIzaSyBhmLLZAYkuEe-HhfWxpw5wgv2qtbRVy5w');
    }, []);
    const [showProgress, setShowProgress] = React.useState(false);
    /*Creamos un state a nuestro mapa para poder actualilzarlo desde fuera del MapView */
    const [mapa, setMapa] = React.useState(null);

    return (
        <>
            {progress && <ProgressDialog />}

            <ScrollView style={{ backgroundColor: '#302c3c' }}>
                <View style={{ flex: 20 }}>
                    <View
                        style={{
                            flex: 15,
                            marginTop: 40,
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image
                                source={{
                                    uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                                }}
                                style={{
                                    height: 70,
                                    marginTop: 10,
                                    marginStart: 12,
                                    borderRadius: 200,
                                    flex: 0.25,
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#484358',
                                    borderRadius: 35,
                                    marginHorizontal: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        color: 'white',
                                        marginStart: 20,
                                        fontSize: 20,
                                        margin: 6,
                                    }}
                                >
                                    Gamer: {nick}
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: 'white',
                                        marginStart: 20,
                                        marginTop: 1,
                                        fontSize: 20,
                                        margin: 6,
                                    }}
                                >
                                    Online
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 65 }}>
                        <View
                            style={{
                                backgroundColor: '#484358',
                                borderRadius: 27,
                                margin: 15,
                                marginTop: 20,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginTop: 12,
                                    marginBottom: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#f72585',
                                        textAlign: 'center',
                                        fontSize: 20,
                                        margin: 6,
                                        flex: 1,
                                    }}
                                >
                                    Dirección: {direc}
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: 20,
                                        margin: 6,
                                        marginEnd: 12,
                                        flex: 1,
                                    }}
                                >
                                    Latitud: {lati}
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        marginTop: 10,
                                        fontSize: 20,
                                        margin: 6,
                                        marginBottom: 20,
                                    }}
                                >
                                    Longitud: {long}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 9,
                                backgroundColor: '#F6CE15',
                                borderRadius: 27,
                                margin: 8,
                            }}
                        ></View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ flex: 80, borderRadius: 20 }}>
                {/*Mapa para visualizar las direcciones */}
                <MapView
                    style={{ flex: 1 }}
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
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: ubicacion2.latitud,
                            longitude: ubicacion2.longitud,
                        }}
                        //Indicamos que este marcador se pueda mover
                    />
                </MapView>
            </View>
        </>
    );
};

export default Ubix;
