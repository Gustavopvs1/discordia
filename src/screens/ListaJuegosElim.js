

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Button,
    ScrollView,
    FlatList
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import JuegoItem from '../components/JuegoItem';

import CheckBox from 'expo-checkbox';

import { FontAwesome } from '@expo/vector-icons';
import colores from '../styles/colores';

import ProgressDialog from './../components/ProgressDialog';

import firebase from '../backend/firebase';


/*
Aquí importamos componentes de librerías como colores, textos y imagenes.
*/
const ListaJuegosElim = (props) => {

    console.log(props.route.params);

    const [progress, setProgess] = React.useState(false);
   
    const [ListJuegosCat, setListJuegCat] = React.useState([]);

    const [juegUsu, setJuegUsu] = React.useState(props.route.params);



    const consulta = async () => {
        setProgess(true);

        const juegos = [];

        try{
            const query = await firebase.database.collection('juegos').where('nombre', 'in', juegUsu).get();
            query.docs.forEach(async (game) => {	        
                juegos.push({id: game.id, nombre: game.data().nombre, select: false})
            });
            setProgess(false);
        }
        catch (exception) {
            console.log('Error', JSON.stringify(exception));
            setProgess(false);
        }
        setListJuegCat(juegos);

    };

    const addnueJuegUsu =  async () => {
        
        /*if (ListJuegosCat.select == true){
            setNueJueUsu([...nueJuegUsu, ListJuegosCat.nombre])
        }*/

    
    }; 

    const handleEditJue = async () => {
        setShowProgress(true);

        try {


            await firebase.database.collection('users').add(
                {
                     
                }
            );

            Alert.alert('¡Listo!','Juegos agregados');   
            setProgess(false);
             

        } catch (exception) {
            setProgess(false);
            console.log(JSON.stringify(exception));
            
        }
    };
    

    React.useEffect(() => {    
            consulta();     
        }, 
    []);

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
                    data={ListJuegosCat}                                                          
                    renderItem={(item) => (
                        <JuegoItem
                            juego={item.item}
                            indice={item.index}
                            consulta={consulta}
                            setProgress={setProgess}
                        />
                    )}
                    ListHeaderComponent = {() => <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, marginHorizontal:  20, marginTop: 10, marginBottom: 3, alignSelf: 'center'}}></Text>}
                    keyExtractor={(item) => item.id}                                
                />
            </View>
        </>
    );
};

export default ListaJuegosElim;