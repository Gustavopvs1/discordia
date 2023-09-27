import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import firebase from '../../backend/firebase';
import ProgressDialog from '../../components/ProgressDialog';

const ChatsTab = (props) => {
    const [progress, setProgess] = React.useState(false);

    const [fuuid, setFuuid] = React.useState('');

    const [listUsu, setListUsu] = React.useState([]);

    const consulta = async () => {
        setProgess(true);
        const users = [];
        try {
            const query = await firebase.database
                .collection('users')
                .where('fuuid', '!=', firebase.auth.currentUser.uid)
                .get();

            query.docs.forEach(async (user) => {
                users.push({
                    id: user.id,
                    fuuid: user.data().fuuid,
                    nickName: user.data().nickName,
                    edad: user.data().edad,
                    sexo: user.data().sexo,
                });
            });
            setProgess(false);
        } catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert('Ocurrió un error', 'Se requiere recargar los datos', [
                { text: 'Ok', onPress: () => consulta() },
            ]);
            setProgess(false);
        }
        setListUsu(users);
    };

    React.useEffect(() => {
        consulta();
    }, []);

    return (
        <>
            {progress && <ProgressDialog />}
            <View style={{ flex: 1, backgroundColor: '#302c3c' }}>
                <FlatList
                    data={listUsu}
                    renderItem={(item) => {
                        const usuarios = [...listUsu];
                        setFuuid(item.item.fuuid);
                        return (
                            <TouchableOpacity
                                style={{
                                    margin: 8,
                                    marginHorizontal: 20,
                                    padding: 15,
                                    backgroundColor: '#571D6A',
                                    borderRadius: 8,
                                }}
                                onPress={() => {
                                    props.navigation.navigate('perfilx', {
                                        ...item.item,
                                    });
                                }}
                            >
                                <View style={{ flexDirection: 'column' }}>
                                    <View>
                                        <View style={{ flex: 25 }}>
                                            <Image
                                                source={{
                                                    uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                                                }}
                                                style={{
                                                    width: 65,
                                                    height: 60,
                                                    resizeMode: 'stretch',
                                                    borderRadius: 100,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 25 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    textAlign: 'center',
                                                    color: '#fff',
                                                    alignSelf: 'center',
                                                    marginTop: 5,
                                                }}
                                            >
                                                Nickname:
                                                {'  '}
                                                {item.item.nickName}
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flex: 25,
                                            alignContent: 'flex-start',
                                            marginTop: 13,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                textAlign: 'center',
                                                color: '#fff',
                                                alignSelf: 'center',
                                                marginTop: -12,
                                            }}
                                        >
                                            Edad:
                                            {'  '}
                                            {item.item.edad}
                                            {' '}
                                            años
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 25,
                                            alignContent: 'flex-start',
                                            marginTop: 13,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                textAlign: 'center',
                                                color: '#fff',
                                                alignSelf: 'center',
                                                marginTop: -12,
                                            }}
                                        >
                                            Sexo:
                                            {'  '}
                                            {item.item.sexo}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListHeaderComponent={() => (
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginHorizontal: 20,
                                marginTop: 10,
                                marginBottom: 3,
                                alignSelf: 'center',
                            }}
                        >
                            Usuarios{' '}
                        </Text>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
};
export default ChatsTab;