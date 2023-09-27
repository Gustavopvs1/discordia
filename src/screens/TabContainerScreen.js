/*BottomNavigator es el componente 
    principal de navegacion por tabs, para indicar
    una nueva pestaña dentro del contenedor, es necesario
    agregar la referencia a su componente
*/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilTab from './tabs/PerfilTab';

import HomeTab from './tabs/HomeTab';
import ChatsTab from './tabs/ChatsTab';
/*Inicializamos el contenedor de  menu Tabs*/

import {Feather } from '@expo/vector-icons';

import colores from '../styles/colores';
/*
Aquí importamos componentes de librerías como el background, textos y imagenes.
*/
const Tab = createBottomTabNavigator();

const TAB_ICON = {
    tab_home: 'home',
    tab_chats: 'users',
    tab_perfil: 'user',
    
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({ size, color }) => (
            <Feather name={iconName} size={size} color={color} />
        ),

        tabBarActiveTintColor: colores.pinkPurpleLi,
        tabBarInactiveTintColor: colores.pinkPurple,
        headerShown: false,
        tabBarStyle: { backgroundColor: colores.opDarkBlue },
    };
};

const TabContainerScreen = (props) => {
    /*El componente contenedor debe retornar un 
    navigator de tipo tab con cada item de pestaña
    como un screen*/

    return (
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
                name='tab_home'
                component={HomeTab}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name='tab_chats'
                component={ChatsTab}
                options={{ title: 'Usuarios' }}
            />
            <Tab.Screen
                name='tab_perfil'
                component={PerfilTab}
                options={{ title: 'Perfil' }}
            />
        </Tab.Navigator>
    );
};

export default TabContainerScreen;
