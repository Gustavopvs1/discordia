import React from "react";
import { FlatList, View, RefreshControl, Text } from "react-native";
import firebase from "./../../backend/firebase";
import {Entypo} from '@expo/vector-icons';
import { useEffect } from "react/cjs/react.production.min";

const ListaUbicacionesScreen = (props) => {


   
    //creamos un state de tipo arreglo para guardar la coleccion de ubucaciones desde firestore
    const [ubicaciones, setUbicaciones] = React.useState(
        []
    );

    const [flatCargando, setFlatCargando] =  React.useState(false);

    /*Funcion flecha que nos permita realizar la consulta de ubicaciones y 
     alamcenar en el state ubicaciones */
    const cargarUbicaciones = async () => {

        setFlatCargando(true);
        
        //Generamos la consulta a la coleccion ubicaciones
        const query = await firebase.database.collection('ubicaciones').get();

        /*Los datos de cada documento se almacenan en un arreglo llamado docs*/

        /*Creamos un arreglo para guardar todos los datos de cada documento */
        const arrUbic = [];

        //Recoremos con un foreach todos los elementos del arreglo
        query.docs.forEach((ub) => {

            /*Los valores estan divididos: 
              El id no es parte de los elementos de la colleccion 
              
              Para ver los datos:
              _elem_.data()

              Para ver el id:
              _elem_.id
              */

              /*Agragamos al arreglo un objeto con el id y los datos del documento */
                arrUbic.push({
                    id: ub.id,
                    ...ub.data(),
                });

                /*Pasamos el arreglo de ubicaciones al state */

                setUbicaciones(arrUbic);

                setFlatCargando(false);
            
        })
    };
     
        /*Cuando deseeamos realizar alguna accion justo antes de que se 
         muestre el return, antes de mostrar la parte grafica, o al actualizarse algun
         componente o al cerrar un Screen podemos utilizar los efectos (hooks) que
         nos permiten manipular el ciclo de vida de los componentes 
         
         Controlamos el evento de ejecucion (al iniar, actulizar o al cerrar)
         por medio de corchetes y el retorno del hook

        */


        /*
         Efecto que se ejecuta justo al cargar el screen 
         para indicar que el efecto se ejecutara al inicio
         agregamos al final corchetes vacios 
         */

         React.useEffect(() => {cargarUbicaciones()}, []);

    return(
        <View style={{flex: 1}}>
            <FlatList refreshControl={<RefreshControl refreshing={flatCargando} onRefresh={() => cargarUbicaciones()}/>}
                      data={ubicaciones} 
                      renderItem={(item) => (

                          <View style={{margin: 8, padding: 16, backgroundColor: '#000', borderRadius: 8}}>
                              <Text style={{fontSize: 18, color: '#fff', lineHeight: 45}}>
                                <Entypo name='location' size={32} />
                                {item.item.nombre} 
                                {'\n'}
                                <Entypo name='location-pin' size={24} />
                                {' '}
                                {item.item.punto.latitude}
                                {'\n'}
                                <Entypo name='location-pin' size={24} />
                                {' '}
                                {item.item.punto.longitude}  
                              </Text>
                          </View>
                      )}
                      keyExtractor={(item) => item.id}
                      />
        </View>
    );
}

export default ListaUbicacionesScreen;