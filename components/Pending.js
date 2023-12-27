import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Skeleton, VStack
} from 'native-base';
const Pending = () => {
    return (
        <VStack w="100%" maxW="400" borderWidth="1" h="100%" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
        </VStack>
    );
}

const styles = StyleSheet.create({})

export default Pending;