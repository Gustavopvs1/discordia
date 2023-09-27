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
import { useFocusEffect } from '@react-navigation/native';

import colores from '../styles/colores';

import firebase from '../backend/firebase';
import PubliItem from '../components/PubliItem';
import ProgressDialog from '../components/ProgressDialog';

const PubliUser = (props) => {

    const [flatCargando, setFlatCargando] =  React.useState(false);

    const [progress, setProgess] = React.useState(false);

    const [listPubl, setListPubl] = React.useState([]);

    const consulta = async () => {
        setFlatCargando(true);
        setProgess(true);
        
        const publicaci = [];
        try {
            const query = await firebase.database.collection('publicaciones').where('fuuid', '==', firebase.auth.currentUser.uid).get();

            query.docs.forEach(async (publ) => {	        
                publicaci.push({id: publ.id, nickName:  publ.data().nickName, text: publ.data().text, fuuid: publ.data().fuuid, foto:  publ.data().foto})
            });

            setFlatCargando(false);
            setProgess(false);
        } catch (exception) {
            console.log('Error', JSON.stringify(exception));

            Alert.alert('Ocurrió un error', 'Se requiere recargar los datos', [
                { text: 'Ok', onPress: () => consulta() },
            ]);
            setFlatCargando(false);
            setProgess(false);
        }

        setListPubl(publicaci);
    };

    	// Efecto para consultar la colección mascotas en cuanto se inicialice
	// este Screen
	React.useEffect(() => {
		consulta();
	}, []);

	/*
    Agregamos un focusEffect para que al volver 
    del insertar mascota, se vuelva a ejecutar 
    la consulta y actualice el arreglo
    */
	useFocusEffect(
		React.useCallback(() => {
			consulta();
		}, [])
	);

    return (
        <>
            {progress && <ProgressDialog />}
            <View style={{flex: 1, backgroundColor: '#302c3c',}}>

                <FlatList
                        refreshControl={<RefreshControl refreshing={flatCargando} onRefresh={() => consulta()}/>}
                        data={listPubl}                                                          
                        renderItem={(item) => (
                            <PubliItem
                                publi={item.item}
                                consulta={consulta}
                                setProgress={setProgess}
                            />
                        )}
                        ListHeaderComponent = {() => <Text style={{color: 'white', fontSize: 24, marginHorizontal:  20, marginTop: 10, marginBottom: 3, alignSelf: 'center'}}>Publicaciones</Text>}                             
                />
            </View>
        </>
    );
};
export default PubliUser;