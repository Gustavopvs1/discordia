/* Una vez agragada la configuracion tanto de Android como iOS en el 
    archivo app.json, configuramos una conexion generica para ambos 
    SO basado en la conexion web (JS)

    Instalamos firebase
 */

import firebase from 'firebase';

//importamos el motor de base de datos nosql

import 'firebase/firestore';

/*Reutilizamos el obejto de conexion de la version web de firebase */

 const firebaseConfig = {
  apiKey: "AIzaSyBaMGhfdPzm3t2IDT1coYk3f2L_4i11wsc",
  authDomain: "moysc-3bb75.firebaseapp.com",
  projectId: "moysc-3bb75",
  storageBucket: "moysc-3bb75.appspot.com",
  messagingSenderId: "521258225155",
  appId: "1:521258225155:web:005ded1d300da5e7b68836",
  measurementId: "G-RG813PZTC6"
};

//Inicalizamos el servicio de firebase 
firebase.initializeApp(firebaseConfig);

//Exportamos los servicios de firebase que vamos a ocupar

const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default{
    firebase,
    database,
    storage,
    auth

};
