import React, {useState, useEffect, useLayoutEffect, useCallback} from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; 
import firebase, {addDoc, onSnapshot} from '../backend/firebase';

import { FontAwesome, MaterialCommunityIcons, Feather, MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";


export default function Chat(props) {
	const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRightL: 10}}
                    onPress={ () => {props.navigation.navigate('tabs');}}
                >
                    
                    <Entypo name="cross" size={24} color="#fff" />
                    
                </TouchableOpacity>
            )
        });
    });

	useLayoutEffect(() => {
		getChats();
	}, []);

	const getChats = async () => {
		const query = await firebase.database
			.collection('chats')
			.orderBy('createdAt', 'desc')
			.onSnapshot((querySnapshot) => {
				setMessages(
					querySnapshot.docs.map((doc) => ({
						_id: doc.data()._id,
						createdAt: doc
							.data()
							.createdAt.toDate(),
						text: doc.data().text,
						user: doc.data().user,
					}))
				);
			});
	};

	const onSend = useCallback(async (messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		// setMessages([...messages, ...messages]);
		const { _id, createdAt, text, user } = messages[0];
		await firebase.database.collection('chats').add({
			_id,
			createdAt,
			text,
			user,
		});
	}, []);

	return (
        <View style={{flex: 90}}>
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebase.auth.currentUser.uid
            }}
            messagesContainerStyle={{
                backgroundColor: '#302c3c'
            }}
            />
        </View>
	);
};




