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

import colores from '../styles/colores';

import firebase from '../backend/firebase';
import ProgressDialog from '../components/ProgressDialog';

const CRUDPubl = (props) => {


    const [flatCargando, setFlatCargando] =  React.useState(false);

    const [progress, setProgess] = React.useState(false);

    const [publi, setPubli] = React.useState(props.route.params);


    const [text, setText] = React.useState("");
    const [fuuid, setFuuid] = React.useState("");
    const [nick, setNick] = React.useState("");

    const consulta = async () => {
        setFlatCargando(true);
        setProgess(true);
        
        try {
            const query = await firebase.database.collection('publicaciones').where('id', '==', 'KE0OCajMFDJM8yUAxqEy').get();

            query.docs.forEach(async (publi) => {
                setNick(publi.data().nickName);
                setText(publi.data().text);
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

    };

    React.useEffect(() => {
        consulta();
    }, []);

    return (
        <>
            {progress && <ProgressDialog />}
            <View style={{flex: 1, backgroundColor: '#302c3c',}}>

                <View style={{flex: 20}}></View>

                <View
                    style={{flex: 60,}}
                >
                                

                                        <View style={{flex: 1}}>
                                            <Text style={{fontSize: 16 ,textAlign: 'center' , color: colores.grisecito, alignSelf: 'flex-start'}}>
                                                {console.log(nick)}
                                                {'  '}
                                                {nick} 
                                            </Text>
                                        </View>        
                                    
                                    
                </View>
               

                <View style={{flex: 20}}></View>
            </View>
        </>
    );
};
export default CRUDPubl;