import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from 'react-native';
import {
    FontAwesome,
    MaterialCommunityIcons,
    Feather,
    MaterialIcons,
    Ionicons,
} from '@expo/vector-icons';
import firebase from '../backend/firebase';
import ProgressDialog from '../components/ProgressDialog';

/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const PerfilX = (props) => {
    const [progress, setProgess] = React.useState(false);
    const [perfil, setPerfil] = React.useState(props.route.params);

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
                setPerfil(user.data());
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

    return (
        <>
            {progress && <ProgressDialog />}

            <ScrollView style={{ backgroundColor: '#302c3c' }}>
                <View style={{ flex: 1 }}>
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
                                    flexDirection: 'row',
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
                                    Edad: {edad} años
                                </Text>
                                <Text
                                    style={{
                                        color: '#f72585',
                                        textAlign: 'center',
                                        fontSize: 20,
                                        margin: 6,
                                        marginEnd: 12,
                                        flex: 1,
                                    }}
                                >
                                    Sexo: {sexo}
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
                                    Email: {email}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#47170F80',
                                        width: 140,
                                        height: 55,
                                        margin: 20,
                                        marginTop: 8,
                                        textAlign: 'center',
                                        padding: 20,
                                        paddingBottom: -10,
                                        borderRadius: 40,
                                        borderWidth: 2,
                                        borderColor: '#F6CE15',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        props.navigation.navigate('ubix', {
                                            ...perfil,
                                        });
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: -18,
                                        }}
                                    >
                                        <FontAwesome
                                            name='map-marker'
                                            size={18}
                                            color='#F6CE15'
                                        />

                                        <Text
                                            style={{
                                                color: '#F6CE15',
                                                marginTop: -3,
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {' '}
                                            Ubicación
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#47170F80',
                                        width: 140,
                                        height: 55,
                                        margin: 20,
                                        marginTop: 8,
                                        textAlign: 'center',
                                        padding: 20,
                                        paddingBottom: -10,
                                        borderRadius: 40,
                                        borderWidth: 2,
                                        borderColor: '#F6CE15',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        props.navigation.navigate(
                                            'publiuserx',
                                            {
                                                ...perfil,
                                            }
                                        );
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: -18,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name='post-outline'
                                            size={24}
                                            color='#F6CE15'
                                        />

                                        <Text
                                            style={{
                                                color: '#F6CE15',
                                                marginTop: -3,
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {' '}
                                            Publicaciones
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                marginTop: 13,
                                backgroundColor: '#b5179e80',
                                borderRadius: 27,
                                margin: 8,
                            }}
                        >
                            <FlatList
                                data={jueg}
                                renderItem={(item) => (
                                    <View
                                        style={{
                                            margin: 8,
                                            marginHorizontal: 20,
                                            padding: 16,
                                            backgroundColor: '#571D6A',
                                            borderColor: '#b5179e',
                                            borderRadius: 8,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={{
                                                    flex: 25,
                                                    alignContent: 'center',
                                                    marginTop: 15,
                                                }}
                                            >
                                                <FontAwesome
                                                    name='gamepad'
                                                    size={24}
                                                    color='#fff'
                                                    style={{ marginTop: 1 }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 55,
                                                    alignContent: 'flex-start',
                                                    marginTop: 13,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        color: '#fff',
                                                        alignSelf: 'flex-start',
                                                    }}
                                                >
                                                    {'  '}
                                                    {item.item}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 20 }}>
                                                <Image
                                                    source={{
                                                        uri: 'https://image.api.playstation.com/vulcan/img/rnd/202112/0508/9SK4qg9A0A94chx1WCp32UEh.png',
                                                    }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        resizeMode: 'stretch',
                                                        borderRadius: 25,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                                ListHeaderComponent={() => (
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                            marginHorizontal: 20,
                                            marginTop: 5,
                                        }}
                                    >
                                        Lo que juego es:{' '}
                                    </Text>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default PerfilX;
