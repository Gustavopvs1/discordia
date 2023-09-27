import React from 'react';
import {
	Alert,
	Button,
	Image,
	Platform,
	ScrollView,
	Switch,
	Text,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	View,
} from 'react-native';

// Una vez instalada la librería
// npm i radio-buttons-react-native-expo
import RadioButtonRN from 'radio-buttons-react-native-expo';

// Una vez instalada la librería expo-checkbox
// expo install expo-checkbox
import CheckBox from 'expo-checkbox';

// Una vez instalada la librería expo-slider
// expo install @react-native-community/slider
import Slider from '@react-native-community/slider';

// Una vez instalada la librería expo-picker
// expo install @react-native-picker/picker
import { Picker } from '@react-native-picker/picker';

// Una vez instalada la librería expo-datepicker
// expo install @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

import estilos from '../styles/estilos';
import {
	AntDesign,
	FontAwesome5,
} from '@expo/vector-icons';
import colores from '../styles/colores';

const ControlesScreen = (props) => {
	// Constante para simular el estado de un Switch
	const valorSwitch = true;

	// Constante para simular el estado de un CheckBox
	const valorCheckBox = true;

	// Los RadioButtons están hechos para que solo
	// pueda seleccionarse uno del grupo
	// La librería de RadioButton funciona por medio
	// de un arreglo

	// Creamos un arreglo con las opciones del RadioButton
	const opcionesRadioButton = [
		{
			value: 1,
			label: 'Opción 1',
		},
		{
			value: 2,
			label: 'Opción 2',
		},
		{
			value: 3,
			label: 'Opción 3',
		},
	];

	/*
    Los States son un tipo de elemento de React 
    que permiten actualizar información en tiempo de ejecución
    Generando nuevas versiones de constantes
    */
	const [campoTexto1, setCampoTexto1] =
		React.useState('Texto 1');
	const [campoTexto2, setCampoTexto2] =
		React.useState('Texto 2');
	const [campoTexto3, setCampoTexto3] =
		React.useState('Texto 3');
	const [campoTexto4, setCampoTexto4] =
		React.useState('Texto 4');
	const [campoTexto5, setCampoTexto5] =
		React.useState('Texto 5');
	const [campoTexto6, setCampoTexto6] =
		React.useState('Texto 6');

	/*
    State para Switch
    */
	const [valSwitch1, setValSwitch1] =
		React.useState(false);
	const [valSwitch2, setValSwitch2] =
		React.useState(false);
	const [valSwitch3, setValSwitch3] =
		React.useState(false);
	const [valSwitch4, setValSwitch4] =
		React.useState(false);

	/*
    Valor del RadioButton
    */
	const [valRadio, setValRadio] = React.useState(null);

	/*
    Valor del checkBox
    */
	const [valCheck1, setValCheck1] = React.useState(false);
	const [valCheck2, setValCheck2] = React.useState(false);
	const [valCheck3, setValCheck3] = React.useState(false);
	const [valCheck4, setValCheck4] = React.useState(false);

	/*
    Slider
    */
	const [valSlider, setValSlider] = React.useState(0);

	/*
    Picker
    */
	const [valPicker, setValPicker] = React.useState(null);

	/*
    DatePicker
    En el caso de iOS por defecto es true, para el caso 
    de Android, por defecto es false
    */
	const [datePickerVisible, setDatePickerVisible] =
		React.useState(
			Platform.OS === 'ios' ? true : false
		);

	return (
		<ScrollView>
			<Text style={estilos.tituloComponente}>
				Controles de Entrada
			</Text>

			{/* TextInput es el componente encargado 
            de renderizar un campo de texto, por defecto
            carece de cualquier tipo de diseño */}

			<TextInput
				style={estilos.textInputPerso1}
				placeholder='Nombre'
				keyboardType='default'
				value={campoTexto1}
				// Cuando cambie el texto
				// Actualizamos el valor de State
				onChangeText={(e) => setCampoTexto1(e)}
			/>

			<TextInput
				style={estilos.textInputPerso2}
				placeholder='Teléfono'
				keyboardType='phone-pad'
				value={campoTexto2}
				onChangeText={(e) => setCampoTexto2(e)}
			/>

			{/* Creamos nuestro propio TextInput con 
            icono */}
			<View style={estilos.textInputIconContainer1}>
				<AntDesign
					name='user'
					size={22}
					color={colores.yinMnBlue}
				/>
				<TextInput
					style={estilos.textInputIcon}
					placeholder='Username'
					keyboardType='default'
					value={campoTexto3}
					onChangeText={(e) => setCampoTexto3(e)}
				/>
			</View>

			<View style={estilos.textInputIconContainer1}>
				<AntDesign
					name='mail'
					size={22}
					color={colores.yinMnBlue}
				/>
				<TextInput
					style={estilos.textInputIcon}
					placeholder='Username'
					keyboardType='email-address'
					//Evitamos la primera letra  mayúscula
					autoCapitalize='none'
					//Evitamos la corrección de palabras
					autoCorrect={false}
					value={campoTexto4}
					onChangeText={(e) => setCampoTexto4(e)}
				/>
			</View>

			<View style={estilos.textInputIconContainer2}>
				<AntDesign
					name='user'
					size={22}
					color={colores.yinMnBlue}
				/>
				<TextInput
					// Forma uno de sobreescribir estilos
					style={{
						...estilos.textInputIcon,
						...estilos.textInputIconLine,
					}}
					placeholder='Username'
					keyboardType='default'
					//Evitamos la primera letra  mayúscula
					autoCapitalize='none'
					//Evitamos la corrección de palabras
					autoCorrect={false}
					value={campoTexto5}
					onChangeText={(e) => setCampoTexto5(e)}
				/>
			</View>

			<View style={estilos.textInputIconContainer2}>
				<AntDesign
					name='mail'
					size={22}
					color={colores.yinMnBlue}
				/>
				<TextInput
					// Forma dos de sobreescribir estilos
					style={{
						...estilos.textInputIcon,
						color: '#000',
						fontWeight: 'normal',
					}}
					placeholder='Username'
					keyboardType='email-address'
					//Evitamos la primera letra  mayúscula
					autoCapitalize='none'
					//Evitamos la corrección de palabras
					autoCorrect={false}
					value={campoTexto6}
					onChangeText={(e) => setCampoTexto6(e)}
				/>
			</View>

			<Text
				style={{
					...estilos.tituloComponente,
					marginTop: 40,
				}}>
				Controles de Selección
			</Text>

			{/* Botón preestablecido por React, look and feel 
            de los botones nativos del S.O */}
			<View
				style={{
					flex: 1,
					margin: 8,
					padding: 8,
				}}>
				<Button title='Botón' color={'tomato'} />
			</View>

			

			<TouchableOpacity
				style={{
					backgroundColor: colores.bone,
					margin: 8,
					padding: 16,
					borderRadius: 8,
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					borderWidth: 2,
					borderColor: colores.yinMnBlue,
				}}>
				<FontAwesome5
					name='upload'
					color={colores.yinMnBlue}
					size={24}
				/>
				<Text
					style={{
						color: colores.yinMnBlue,
						textAlign: 'center',
						marginStart: 16,
						fontSize: 16,
						fontWeight: 'bold',
					}}>
					Botón personalizado
				</Text>
			</TouchableOpacity>

			{/* Componente switch */}
			<Switch
				value={valSwitch1}
				trackColor={{
					false: colores.candyPink, //Color de la barra apagada (Android)
					true: colores.yinMnBlue, //Color de la barra encendida (Android)
				}}
				ios_backgroundColor={colores.candyPink}
				// Dependiendo del estado del Swith podemos
				// cambiar el color del Thumb
				thumbColor={
					valSwitch1
						? colores.vividSkyBlue
						: colores.bone
				}
				//Guardamos en uns State
				//el estado actual del switch
				onValueChange={(e) => {
					console.log(e);
					//Modificamos dos Switch a la vez
					setValSwitch1(e);
					setValSwitch2(e);
				}}
			/>

			<Switch
				value={valSwitch2}
				trackColor={{
					false: colores.candyPink,
					true: colores.yinMnBlue,
				}}
				//Color de la barra apagada (iOS)
				ios_backgroundColor={colores.candyPink}
				thumbColor={
					valSwitch2
						? colores.vividSkyBlue
						: colores.bone
				}
				onValueChange={(e) => setValSwitch2(e)}
			/>

			<Text style={estilos.tituloComponente}>
				Switch con etiqueta
			</Text>

			<View style={estilos.switchContainer}>
				<Text
					style={estilos.switchText}
					onPress={() => {
						/*
                        Cuando se toque el texto, vamos a invertir 
                        el valor de los switch
                        */
						setValSwitch3(!valSwitch3);
					}}>
					Acepto los términos y condiciones
				</Text>
				<Switch
					value={valSwitch3}
					trackColor={{
						false: colores.candyPink, //Color de la barra apagada (Android)
						true: colores.yinMnBlue, //Color de la barra encendida (Android)
					}}
					ios_backgroundColor={colores.candyPink}
					// Dependiendo del estado del Swith podemos
					// cambiar el color del Thumb
					thumbColor={
						valSwitch3
							? colores.vividSkyBlue
							: colores.bone
					}
					onValueChange={(e) => setValSwitch3(e)}
				/>
			</View>

			<View style={estilos.switchContainer}>
				<Text
					style={estilos.switchText}
					onPress={() =>
						setValSwitch4(!valSwitch4)
					}>
					Vender mi alma
				</Text>
				<Switch
					value={valSwitch4}
					trackColor={{
						false: colores.candyPink, //Color de la barra apagada (Android)
						true: colores.yinMnBlue, //Color de la barra encendida (Android)
					}}
					ios_backgroundColor={colores.candyPink}
					// Dependiendo del estado del Swith podemos
					// cambiar el color del Thumb
					thumbColor={
						valSwitch4
							? colores.vividSkyBlue
							: colores.bone
					}
					onValueChange={(e) => setValSwitch4(e)}
				/>
			</View>

			<Text style={estilos.tituloComponente}>
				RadioButtons
			</Text>

			{/* Indicamos un componente de tipo RadioButtonRN
            donde mostramos las opciones previamente generadas 
            en el arreglo  */}
			<View style={{ paddingHorizontal: 8 }}>
				<RadioButtonRN
					data={opcionesRadioButton}
					icon={
						<FontAwesome5
							name='check'
							size={22}
							color={'green'}
						/>
					}
					// Guardamos en valRadio el
					// objeto del RadioButton
					// Seleccionado
					selectedBtn={(e) => setValRadio(e)}
				/>
			</View>

			<Text style={estilos.tituloComponente}>
				CheckBox
			</Text>

			{/* Los CheckBox son componentes diseñados
            para seleccionarse uno, ninguno o varios  */}
			<CheckBox
				value={valCheck1}
				color={colores.middleBlueGreen}
				// Guardamos en un state el cambio
				// del valor del Check
				onValueChange={(e) => {
					console.log(e);
					setValCheck1(e);
					setValCheck2(e);
				}}
			/>
			<CheckBox
				value={valCheck2}
				color={colores.candyPink}
				onValueChange={(e) => setValCheck2(e)}
			/>

			<Text style={estilos.tituloComponente}>
				CheckBox con etiqueta
			</Text>

			<View style={estilos.checkBoxContainer}>
				<CheckBox
					value={valCheck3}
					color={colores.roseDust}
					onValueChange={(e) => setValCheck3(e)}
				/>
				<Text
					style={estilos.checkBoxText}
					onPress={() => {
						/*
                        Al dar click al texto invertimos el valor
                        del Check
                        */
						setValCheck3(!valCheck3);
					}}>
					Deseo recibir ofertas
				</Text>
			</View>

			<View style={estilos.checkBoxContainer}>
				<CheckBox
					value={valCheck4}
					color={colores.yinMnBlue}
					onValueChange={(e) => setValCheck4(e)}
				/>
				<Text
					style={estilos.checkBoxText}
					onPress={(e) =>
						setValCheck4(!valCheck4)
					}>
					Deseo suscribirme
				</Text>
			</View>

			<Text style={estilos.tituloComponente}>
				Slider
			</Text>
			<Text style={estilos.tituloComponente}>
				Valor slider: {valSlider}
			</Text>
			<Slider
				style={{ margin: 8 }}
				minimumValue={1}
				maximumValue={100}
				value={valSlider}
				step={1}
				minimumTrackTintColor={colores.candyPink}
				maximumTrackTintColor={colores.yinMnBlue}
				thumbTintColor={colores.tumbleweed}
				/*
                Guardamos el valor del Slider en su state
                */
				onValueChange={(e) => setValSlider(e)}
			/>

			<View style={{ margin: 8, padding: 8 }}>
				<Text
					style={{
						...estilos.tituloComponente,
						marginBottom: 0,
						paddingBottom: 0,
					}}>
					Picker (selecciona)
				</Text>
				<View
					style={{
						borderWidth:
							Platform.OS === 'android'
								? 2
								: null,
						borderColor: colores.yinMnBlue,
						marginTop: 8,
					}}>
					<Picker
						prompt='Selecciona un elemento'
						numberOfLines={1}
						selectedValue={valPicker}
						// Para Android podemos visualizar
						// El Picker como una modal o como un
						// Dropdown Item
						//dropdown <----- como un select
						//modal <-------- en una ventana independiente
						mode='dropdown'
						// Ponemos un margen negativo SOLO PARA IOS
						style={{
							marginTop:
								Platform.OS === 'ios'
									? -32
									: 0,
						}}
						/*
                        Guardamos en el state el cambio de valor
                        del Picker 
                        */
						onValueChange={(e) =>
							setValPicker(e)
						}>
						<Picker.Item
							label='Uno'
							value={1}
						/>
						<Picker.Item
							label='Dos'
							value={2}
						/>
						<Picker.Item
							label='Tres'
							value={3}
						/>
						<Picker.Item
							label='Cuatro'
							value={4}
						/>
						<Picker.Item
							label='Cinco'
							value={5}
						/>
					</Picker>
				</View>
			</View>

			<Text style={estilos.tituloComponente}>
				DatePicker
			</Text>
			{/* El Botón para mostrar DatePicker solo aplica  si el 
            SO NO ES iOS */}
			{Platform.OS !== 'ios' && (
				<Button
					title='Mostrar DatePicker'
					onPress={() => {
						// Mostramos el datepicker
						setDatePickerVisible(true);
					}}
				/>
			)}
			{/* Para mostrar un DatePicker necesitamos indicar 
            el tipo de vista (display) y la fecha de inicio 
            del DatePicker */}

			{/* Verificamos si datePickerVisible es verdadero
                    de lo contrario no renderizamos esta sección 
                    del código  */}

			{datePickerVisible && (
				<DateTimePicker
					// Display spinner solo aplica en iOS
					// display='spinner'
					display='default'
					value={new Date()}
					onChange={(e) => {
						//Cambiar el State
						//de visibilidad del datepicker
						//nuevamente a falso
						//Si No es IOS
						Platform.OS !== 'ios'
							? setDatePickerVisible(false)
							: null;
						console.log(e.nativeEvent);
					}}
				/>
			)}

			<View style={{ margin: 8, padding: 8 }}>
				<Button
					title='Alert'
					onPress={() => {
						/*
                        Alert es el componente que permite mostrar 
                        Diálogos de manera nativa en ambas plataformas 
                        tienes la siguiente estructura:
                        1.- Título
                        2.- Mensaje 
                        3.- Botones 
                        4.- Config adicional
                        */
						Alert.alert(
							'Título',
							'Mensaje, que puede ser un texto...',
							// Alert maneja los Botones
							// como un arreglo limitado a 3 Botones
							// cuando se trata de Android
							// Cada botón cuenta con 3 argumentos:
							// 1. - Texto del botón
							// 2. - La acción al darl click
							// 3. - Estilo de botón (SOLO iOS)
							[
								{
									text: 'B1',
									onPress: () => {},
									style: 'default',
								},
								{
									text: 'B2',
									onPress: () => {},
									style: 'cancel',
								},
								{
									text: 'B3',
									onPress: () =>
										props.navigation.navigate(
											'menu'
										),
									style: 'destructive',
								},
								// SOLO iOS soporta N cantidad
								// de botones, pero Android solo
								// muestra tres
								{
									text: 'B4',
									onPress: () => {},
									style: 'default',
								},
								{
									text: 'B5',
									onPress: () => {},
									style: 'default',
								},
								{
									text: 'B6',
									onPress: () => {},
									style: 'default',
								},
							]
						);
					}}
				/>
			</View>

			{/* Creamos un espacio para que los elementos no queden sobre el fondo */}
			<View style={{ marginBottom: 100 }} />
		</ScrollView>
	);
};

export default ControlesScreen;