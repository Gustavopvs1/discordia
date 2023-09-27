import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';

import colores from '../../styles/colores';
import { FontAwesome, MaterialCommunityIcons, Feather, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

import firebase from '../../backend/firebase';
import ProgressDialog from '../../components/ProgressDialog';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const HomeTab = (props) => {

    const [flatCargando, setFlatCargando] =  React.useState(false);

    const [progress, setProgess] = React.useState(false);

    const [listPubl, setListPubl] = React.useState([]);

    const consulta = async () => {
        setFlatCargando(true);
        setProgess(true);

        const publicaci = [];

        try{
            const query = await firebase.database.collection('publicaciones').get();
            query.docs.forEach(async (publ) => {	        
                publicaci.push({id: publ.id, nickName:  publ.data().nickName, text: publ.data().text, fuuid: publ.data().fuuid, foto: publ.data().foto})
            });
            setFlatCargando(false);
            setProgess(false);
        }
        catch (exception) {
            console.log('Error', JSON.stringify(exception));
            setFlatCargando(false);
            setProgess(false);
        }
        
        setListPubl(publicaci);

    };

    React.useEffect(() => {    
        consulta();     
    }, []);

    return (

        <>
        {progress && <ProgressDialog />}
            <View style={{flex: 1, backgroundColor: '#302c3c',}}>
                <View >

                    <View style={{marginTop: 15, flexDirection: 'row'}}>

                        <TouchableOpacity
                            style={{
                            backgroundColor: '#302c3c',
                            width:  240,
                            height: 50,
                            margin: 10,
                            marginTop: 15,
                            marginStart: 27,
                            textAlign: 'center',
                            padding: 20,
                            paddingBottom: -10,
                            borderRadius: 40,
                            borderWidth: 2,
                            borderColor: colores.grisecito,
                            alignSelf: 'center'

                            }}
                            onPress={() => {props.navigation.navigate('crearpubl');}}
                        >
                            <Text
                                style={{
                                    color: '#EEEEEE',
                                    marginTop: -8,
                                    fontSize: 14,
                                    alignSelf: 'center'
                                }}
                            >
                                ¿Qué hay de nuevo viejo? 
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                padding: 8,
                                backgroundColor: '#7209b770',
                                borderRadius: 30,
                                borderColor: '#b5179e',
                                borderWidth: 2,
                                marginTop: 10,
                                marginStart: 5
                            
                            }}
                            onPress={() => {
                                props.navigation.replace('chat');      
                            }}
                        >
                            <View style={{alignItems: 'center', marginTop: 7}}>
                                <Entypo name="chat" size={24} color={'#fff'} />
                            </View>

                        </TouchableOpacity>      

                        
                    </View>

                </View>
                <FlatList
                    refreshControl={<RefreshControl refreshing={flatCargando} onRefresh={() => consulta()}/>}
                    data={listPubl}                                                          
                    renderItem={(item) => { 
                        
                        const publicaci = [...listPubl];
                        
                        return (
                        
                        <View style={{margin: 8, marginHorizontal:  20, padding: 10, backgroundColor: '#7209b760', borderRadius: 8,}}>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flex: 30, alignContent: 'center', marginTop: 15, marginStart: 3, flexDirection: 'row'}}>

                                    <View style={{flex: 18}}>
                                        <Image
                                                    source={{
                                                        uri: 'http://dtai.uteq.edu.mx/~gonyel191/imgs/moysc.jpg',
                                                        
                                                    }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        resizeMode: 'stretch',
                                                        borderRadius: 25,
                                                        alignSelf: 'flex-start'
                                                    }}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            flex: 82,
                                        }}
                                        onPress={() => {
                                            props.navigation.navigate('perfilx', {
                                                ...item.item,
                                            });
                                        }}
                                    >
                                        <Text style={{fontSize: 16, fontFamily: 'verdana',textAlign: 'center' , color: colores.grisecito, alignSelf: 'flex-start'}}>
                                            {'  '}
                                            {item.item.nickName} 
                                        </Text>
                                    </TouchableOpacity>        
                                   

                                </View>
                                <View style={{flex: 30, alignContent: 'flex-start', marginTop: 17}}>
                                    <Text style={{fontSize: 16, textAlign: 'center' ,color: '#fff', alignSelf: 'flex-start'}}>
                                        
                                        {'  '}
                                        {item.item.text}
                                    </Text>
                                </View>
                                <View style={{flex: 40, marginTop: 5, alignContent: 'center', alignItems: 'center'}}>
                                    <Image
                                            source={{uri: item.item.foto}}
                                            style={{
                                                width: 250,
                                                height: 250,
                                                resizeMode: 'stretch',
                                                borderRadius: 25
                                            }}
                                    />
                                </View> 
                                
                            </View>
                        </View>
                    )}}
                    ListHeaderComponent = {() => <Text style={{color: 'white', fontSize: 24, marginHorizontal:  20, marginTop: 10, marginBottom: 3, alignSelf: 'center'}}>Nuevas publicaciones</Text>}
                    keyExtractor={(item) => item.id}                                
                />



            </View>
        </>

    );
};

export default HomeTab;
