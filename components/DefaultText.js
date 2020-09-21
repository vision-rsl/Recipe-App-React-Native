import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const DefaultText = props => {
    return <Text style={style.text}>{props.children}</Text>
};

const style = StyleSheet.create({
    text:{
        fontFamily:'open-sans'
    }
})

export default DefaultText;