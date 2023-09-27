
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert, RefreshControl} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import firebase from '../../backend/firebase';
import ProgressDialog from './../../components/ProgressDialog';

/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const PerfilTab = (props) => {

    const [flatCargando, setFlatCargando] =  React.useState(false);

    const [progress, setProgess] = React.useState(false);

    const salirFirebase = async () => {
		try {

			await firebase.auth.signOut();

		} catch (exception) {
			console.log(exception);
		}
	};

   const [perfil, setPerfil] = React.useState(props.route.params);
   const [edad, setEdad] = React.useState("");
   const [fuuid, setFuuid] = React.useState("");
   const [nick, setNick] = React.useState("");
   const [sexo, setSexo] = React.useState("");
   const [email, setEmail] = React.useState(""); 
   const [direc, setDirec] = React.useState("");
   const [lati, setLati] = React.useState("");
   const [long, setLong] = React.useState("");
   const [jueg, setJueg] = React.useState([]);
    
   const consulta = async () => {
        setFlatCargando(true);
        setProgess(true);

        try{
            const query = await firebase.database.collection('users').where('fuuid', '==', firebase.auth.currentUser.uid).get();
            
            query.docs.forEach(async (user) => {
                    setFuuid(user.data().fuuid);       
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
            setFlatCargando(false);
            setProgess(false);
        }
        catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert(
				'Ocurrió un error',
				'Se requiere recargar los datos', 
                [{text: 'Ok', onPress: () => consulta()}]
			);
            setFlatCargando(false);
            setProgess(false);
        } 
                             
    };

   React.useEffect(() => {
    consulta();
    }, []);

    
    return (

        <>
            {progress && <ProgressDialog />}

            <ScrollView style={{backgroundColor: '#302c3c' }}
                         refreshControl={<RefreshControl refreshing={flatCargando} onRefresh={() => consulta()}/>}
            >
                <View style={{ flex: 1}}>
                    <View
                        style={{
                            flex: 15,
                            marginTop: 30,
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity 
                                style={{ flex: 30}}
                                onPress={() => {
                                    props.navigation.navigate('editarfoto', {...perfil});
                                }}
                            >
                                <Image
                                    source={{
                                        uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                                    }}
                                    style={{
                                        height: 70,
                                        width: 70,
                                        marginTop: 10,
                                        marginStart: 12,
                                        borderRadius: 200,
                                    }}
                                />
                            </TouchableOpacity>
                            
                            <View style={{ flex: 70, backgroundColor: '#484358', borderRadius: 35, marginHorizontal:  10, marginLeft: -25}}>

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
                        <View style={{backgroundColor: '#484358', borderRadius: 27, margin: 15, marginTop: 20}}>
                            <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 12 }}>
                                <Text
                                    style={{
                                        color: '#f72585',
                                        textAlign: 'center',
                                        fontSize: 20,
                                        margin: 6,
                                        flex: 1
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
                                        flex: 1
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
                                        marginBottom: 20
                                    }}
                                >
                                    Email: {email}
                                </Text>
                            </View>
                        </View> 


                        
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignItems: 'center'}}>
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
                                                marginTop: -18
                                            }}
                                        >
                                            <FontAwesome name="map-marker" size={18} color="#F6CE15" />

                                            <Text
                                                style={{
                                                    color: '#F6CE15',
                                                    marginTop: -3,
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                               {' '} Ubicación 
                                            </Text>

                                            
                                        </View>     

                                    </TouchableOpacity>
                            </View>

                            <View style={{alignItems: 'center'}}>
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
                                            props.navigation.navigate('publiuser');
                                        }}
                                    >

                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: -18
                                            }}
                                        >
                                    
                                            <MaterialCommunityIcons name="post-outline" size={24} color="#F6CE15" />

                                            <Text
                                                style={{
                                                    color: '#F6CE15',
                                                    marginTop: -3,
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                               {' '} Publicaciones
                                            </Text>

                                            
                                        </View>    

                                        

                                    </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{marginTop: 13, backgroundColor: '#b5179e80', borderRadius: 27, margin: 8, paddingBottom: 10}}>      
                            <FlatList 
                                
                                data={jueg}                              
                                renderItem={(item) => (
                                    <View style={{margin: 8, marginHorizontal:  20, padding: 16, backgroundColor: '#571D6A', borderColor: '#b5179e', borderRadius: 8,}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 25, alignContent: 'center', marginTop: 15}}>
                                                <FontAwesome name="gamepad" size={24} color="#fff" style={{marginTop: 1}}/>
                                            </View>
                                            <View style={{flex: 55, alignContent: 'flex-start', marginTop: 13}}>
                                                <Text style={{fontSize: 18, fontWeight: 'bold',color: '#fff', alignSelf: 'flex-start'}}>
                                                    
                                                    {'  '}
                                                    {item.item}
                                                </Text>
                                            </View>
                                            <View style={{flex: 20}}>
                                                <Image
                                                        source={{
                                                            uri: 'https://image.api.playstation.com/vulcan/img/rnd/202112/0508/9SK4qg9A0A94chx1WCp32UEh.png',
                                                        }}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            resizeMode: 'stretch',
                                                            borderRadius: 25
                                                        }}
                                                />
                                            </View> 
                                        </View>
                                    </View>
                                )}
                                ListHeaderComponent = {() => <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, marginHorizontal:  20, marginTop: 5}}>Lo que juego es: </Text>}
                                ListFooterComponent = {() => 
                                                            <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                                                                        
                                                                        <View>
                                                                            <TouchableOpacity
                                                                                // Enviamos como parámetro de navegación
                                                                                // el id del documento
                                                                                onPress={() => {
                                                                                    props.navigation.navigate('listajuegoselim', [...jueg]);    
                                                                                }}
                                                                                style={{
                                                                                    width: 80,
                                                                                    padding: 8,
                                                                                    backgroundColor: '#47170F80',
                                                                                    borderColor: '#F6CE15',
                                                                                    borderWidth: 2,
                                                                                    borderRadius: 8,
                                                                                    marginStart: 87
                                                                                }}>
                                                                                <View style={{alignItems: 'center'}}>

                                                                                    <Ionicons name="md-add" size={21} color={'#F6CE15'}/>

                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>

                                                                        <View>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    padding: 8,
                                                                                    backgroundColor: '#7209b770',
                                                                                    borderRadius: 8,
                                                                                    borderColor: '#b5179e',
                                                                                    borderWidth: 2,
                                                                                    marginHorizontal: 12,
                                                                                    marginEnd: 8,
                                                                                    width: 80,
                                                                                }}
                                                                                onPress={() => {
                                                                                    props.navigation.navigate('listajuegoselim', [...jueg]);    
                                                                                }}
                                                                            >
                                                                                <View style={{alignItems: 'center'}}>

                                                                                    <Ionicons name="close"
                                                                                        size={20}
                                                                                        color={'#b5179e'} 
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                            </View> 
                            
                            
                            }
                                keyExtractor={(item) => item.id}
                            />
                        </View> 

                    <View style={{ alignItems: 'center', flex: 20, marginTop: 9}}>
                            
                            <View style={{flexDirection: 'row', marginTop: 30}}>
                                <View style={{flex: 50}}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#47170F80',
                                            width: 120,
                                            height: 60,
                                            margin: 10,
                                            marginTop: 15,
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            borderColor: '#F6CE15',
                                            alignSelf: 'center'
                                            
                                        }}
                                        onPress={() => {
                                            props.navigation.navigate('interedit');
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#F6CE15',
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                                marginStart: 8,
                                                marginTop: -1
                                            }}
                                        >
                                            Editar info.
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                           
                                <View style={{flex: 50}}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#7209b770',
                                            width: 120,
                                            height: 60,
                                            margin: 10,
                                            marginTop: 15,
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            borderColor: '#b5179e',
                                            alignSelf: 'center'
                                        }}
                                        onPress={() => {salirFirebase()}}
                                    >
                                        <Text
                                            style={{
                                                color: '#f72585',
                                                marginTop: -2,
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Cerrar sesión 
                                        </Text>
                                    </TouchableOpacity>       
                                </View>       
                            </View>
                        </View>
                    </View>
                </View>    
            </ScrollView>
        </>
    );
};

export default PerfilTab;
