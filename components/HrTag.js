import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
const HrTag = ({ errors, ml, mr, opacity }) => {
    return (
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginLeft: ml,
                marginRight: mr,
                opacity: opacity
            }}
        />
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default HrTag;