/*Invocamos al DrawerNavigator, contenedor de
los componentes navegables desde un Drawer */ 
import {createDrawerNavigator} from '@react-navigation/drawer';


/*Importamos los items del Drawer*/
import HomeDrawerItem from './drawerItems/HomeDrawerItem';
import NotificacionesDrawerItem from './drawerItems/NotificacionesDrawerItem';

/*Inicializamos el contenedor del drawer*/

const Drawer = createDrawerNavigator();

/*Retornamoos  la estrcututra de todo el
NavigationDrawer*/ 

const DrawerContainer = (props) => {

    return(
        <Drawer.Navigator>

            {/*Indicamos todos los menus que tendra nuestro drawer*/}
            <Drawer.Screen name='drawer_home' component={HomeDrawerItem}></Drawer.Screen>

            <Drawer.Screen name='drawer_noti' component={NotificacionesDrawerItem}></Drawer.Screen>

        </Drawer.Navigator>
    );

};


export default DrawerContainer;