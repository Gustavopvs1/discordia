//Import para activar los gestos ya animaciones que
//necesita NavigationDrawer
import 'react-native-gesture-handler';

/*
RN indica que cualquier metodo de navegacion debe estar contenido
por un NavigationContainer, en caso de existir mas de un metodo de navegacion
todos deben pertenecer al mismo NavigationContainer.

Mientras que todas las pantallas que se naveguen mediante un Stack 
devben pertenecer a un StackNavigation

Cada pantalla a la que se puede navegar la representamos por medio de un 
StackScreen

*/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    Text,
    View,
    ScrollView,
} from 'react-native';

/*Debemos importar todas las pantalllas que vamos a referenciar*/
import MenuScreen from './src/screens/MenuScreen';
import LogorSingScreen from './src/screens/LogorSingScreen';
import TabContainerScreen from './src/screens/TabContainerScreen';
import InicioSesion from './src/screens/InicioSesion';
import Registro from './src/screens/Registro';
import ControlesScreen from './src/screens/ControlesScreen';
import InforUser from './src/screens/InforUser';
import EditarInfo from './src/screens/EditarInfo';
import SelecJueScreen from './src/screens/SelecJueScreen';
import ListaUbicacionesScreen from './src/screens/firebase/ListaUbicacionesScreen';
import ListaJuegos from './src/screens/ListaJuegos';
import ListaJuegosElim from './src/screens/ListaJuegosElim';
import AgregarUbicacion from './src/screens/firebase/AgregaUbicacion';
import InterEditInfo from './src/screens/InterEditInfo';
import EditarUbi from './src/screens/EditarUbi';
import PerfilX from './src/screens/Perfilx';
import CrearPubl from './src/screens/CrearPubl';
import PubliUser from './src/screens/PubliUser';
import CRUDPubl from './src/screens/CRUDPubl';
import AgregaMascotaSc from './src/screens/AgregaMascotaSc';
import EditarPubl from './src/screens/EditarPubl';
import Ubix from './src/screens/Ubix';
import Chat from './src/screens/ChatScreen';
import PubliUserx from './src/screens/PubliUserx';
import EditarFoto from './src/screens/EditarFoto';

//invocamos a lofBox para ocultar los Warnings
import { LogBox } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

//Inicializamos el Stack (contenedor) de nuestras pantallas
const Stack = createNativeStackNavigator();

export default function App() {
    /*Ocultamos los warnings del proyecto*/
    LogBox.ignoreAllLogs(true);

    return (
        /*Creamos un contenedor de navegacion para toda la app*/
        <NavigationContainer>
            {/*Creamos uns Stack (contenedor) para nuestras pantallas*/}

            <Stack.Navigator>
                {/*Cada componente al que querramos navegar debe de aparecer
        como screen de este stack*/}
                <Stack.Screen
                    name='menu'
                    component={MenuScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='logorsing'
                    component={LogorSingScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='Inicio de Sesion'
                    component={InicioSesion}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='Registrar'
                    component={Registro}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='tabs'
                    component={TabContainerScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='controles'
                    component={ControlesScreen}
                    options={{ title: 'controles' }}
                ></Stack.Screen>

                <Stack.Screen
                    name='listajuegos'
                    component={ListaJuegos}
                    options={{
                        title: 'Lista de juegos',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='listajuegoselim'
                    component={ListaJuegosElim}
                    options={{
                        title: 'Tu lista de tus juegos',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='inforuser'
                    component={InforUser}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='EditarIn'
                    component={EditarInfo}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='selecjue'
                    component={SelecJueScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='litsUbi'
                    component={ListaUbicacionesScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='agregar-ubi'
                    component={AgregarUbicacion}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='interedit'
                    component={InterEditInfo}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='editarubi'
                    component={EditarUbi}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='perfilx'
                    component={PerfilX}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='crearpubl'
                    component={CrearPubl}
                    options={{
                        title: 'Crear publicación',
                        headerTintColor: 'white',
                        headerTransparent: true,
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='publiuser'
                    component={PubliUser}
                    options={{
                        title: 'Lista de publicaciones',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='publiuserx'
                    component={PubliUserx}
                    options={{
                        title: 'Lista de publicaciones',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='crudpubl'
                    component={CRUDPubl}
                    options={{
                        title: 'Administrar publicación',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='editarpubl'
                    component={EditarPubl}
                    options={{
                        title: 'Publicación',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='agregarmascota'
                    component={AgregaMascotaSc}
                    options={{
                        title: 'Add prueba',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                <Stack.Screen
                    name='ubix'
                    component={Ubix}
                    options={{ headerShown: false }}
                ></Stack.Screen>

                <Stack.Screen
                    name='chat'
                    component={Chat}
                    options={{
                        title: 'Chatea',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#302c3c' },
                    }}
                ></Stack.Screen>

                
                <Stack.Screen
                    name='editarfoto'
                    component={EditarFoto}
                    options={{  title: 'Cambiar foto',headerTintColor: 'white',headerStyle: { backgroundColor: '#302c3c' } }}
                ></Stack.Screen>

                {/*Agregamos al contenedor de Tabs como pantalla navegable
            del Stack*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
