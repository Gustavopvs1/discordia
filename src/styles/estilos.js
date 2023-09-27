import { StyleSheet } from 'react-native';
import colores from './colores';
/*
Declaramos un objeto de estilos globales y lo exportamos 
para poder añadirlo en otros componentes
*/
const estilos = StyleSheet.create({
    contenedor: {
        backgroundColor: colores.yinMnBlue,
        paddingTop: 60,
        flex: 1,
    },

    titulo: {
        fontSize: 30,
        color: colores.bone,
        paddingVertical: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    subtitulo: {
        fontSize: 30,
        color: colores.lightCyan,
        paddingVertical: 10,
        fontWeight: 'normal',
        alignSelf: 'center',
    },

    contenedorTarjeta: {
        backgroundColor: colores.lightCyan,
        marginVertical: 10,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },

    contenedorTarjeta1: {
        backgroundColor: colores.lightCyan,
        height: 80,
        width: 160,
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        margin: 10,
        flex: 1,
        flexDirection: 'column',
    },

    contenedorTarjetaizq: {
        backgroundColor: colores.bone,
        height: 80,
        width: 160,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'flex-end',
        margin: 10,
        flex: 1,
        flexDirection: 'column',
    },

    textoTarjeta: {
        fontSize: 30,
        color: colores.candyPink,
        paddingVertical: 10,
        fontWeight: 'normal',
        alignSelf: 'center',
    },

    contenedorTarjeta2: {
        backgroundColor: colores.chineseViolet,
    },

    textoTarjeta2: { fontSize: 30, color: colores.vividSkyBlue },

    tituloComponente: {
        margin: 16,
        fontSize: 24,
        textAlign: 'center',
        color: colores.yinMnBlue,
        fontWeight: 'bold',
    },

    textInputBase: {
        borderWidth: 1,
        width: null,
    },

    textInputPerso1: {
        borderColor: colores.candyPink,
        borderWidth: 2,
        width: null,
        margin: 8,
        padding: 8,
        borderRadius: 8,
        color: colores.chineseViolet,
        backgroundColor: colores.bone,
    },

    textInputPerso2: {
        borderBottomColor: colores.candyPink,
        borderBottomWidth: 2,
        width: null,
        margin: 8,
        padding: 8,
    },

    textInputIconContainer1: {
        flex: 1,
        flexDirection: 'row',
        borderColor: colores.bone,
        borderWidth: 2,
        backgroundColor: colores.bone,
        margin: 8,
        padding: 8,
        borderRadius: 8,
    },

    textInputIconContainer2: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#F6CE15',
        borderBottomWidth: 2,
        margin: 8,
        padding: 8,
    },

    textInputIcon: {
        flex: 1,
        marginStart: 3,
        color: colores.chineseViolet,
        fontWeight: 'bold',
    },

    textInputIconLine: {
        color: '#FFF',
        fontWeight: 'normal',
        fontSize: 20,
    },

    textInputIconContainer3: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#b5179e',
        borderBottomWidth: 2,
        margin: 5,
        padding: 8,
    },

    textInputLineNick: {
        flex: 10,
        marginStart: 3,
        color: '#FFF',
        fontWeight: 'normal',
        fontSize: 20,
    },
});

export default estilos;
