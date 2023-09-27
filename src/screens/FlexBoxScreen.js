import React from 'react';
import {StyleSheet ,Platform, SafeAreaView, Text, View, ScrollView} from 'react-native';



const FlexBoxScreen = (props) => {

    return(
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>FlexBoxScreen.js</Text>
        </View>
    );

}

export default FlexBoxScreen;