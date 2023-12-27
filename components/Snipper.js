import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Spinner, Input, Icon, ZStack, Image, HStack, VStack, Pressable, useToast } from 'native-base';
const Snipper = () => {
    return (
        <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
                Loading
            </Heading>
        </HStack>
    );
}

const styles = StyleSheet.create({})

export default Snipper;
