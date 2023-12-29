import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { Alert, AlertButton, Linking, StyleSheet, View } from 'react-native'
import { Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from './Constants'
import { useIsForeground } from './hooks/useIsForeground '
import { StatusBarBlurBackground } from '../../views/StatusBarBlurBackgroundImpl'
import { PressableOpacity } from 'react-native-pressable-opacity'
import type { Routes } from './Routes'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/core'
import {  FlashSlash, Flash, ArrowLeft2 } from 'iconsax-react-native';
const showCodeAlert = (value: string, onDismissed: () => void): void => {
    const buttons: AlertButton[] = [
        {
            text: 'Close',
            style: 'cancel',
            onPress: onDismissed,
        },
    ]
    if (value.startsWith('http')) {
        buttons.push({
            text: 'Open URL',
            onPress: () => {
                Linking.openURL(value)
                onDismissed()
            },
        })
    }
    Alert.alert('Scanned Code', value, buttons)
}

type Props = NativeStackScreenProps<Routes, 'CodeScannerPage'>
export function CodeScannerPage({ navigation }: Props): React.ReactElement {
    // 1. Use a simple default back camera
    const device = useCameraDevice('back')

    // 2. Only activate Camera when the app is focused and this screen is currently opened
    const isFocused = useIsFocused()
    const isForeground = useIsForeground()
    const isActive = isFocused && isForeground

    // 3. (Optional) enable a torch setting
    const [torch, setTorch] = useState(true)

    // 4. On code scanned, we show an aler to the user
    const isShowingAlert = useRef(false)
    const onCodeScanned = useCallback((codes: Code[]) => {
        console.log(`Scanned ${codes.length} codes:`, codes)
        const value = codes[0]?.value
        if (value == null) return
        if (isShowingAlert.current) return
        showCodeAlert(value, () => {
            isShowingAlert.current = false
        })
        isShowingAlert.current = true
    }, [])

    // 5. Initialize the Code Scanner to scan QR codes and Barcodes
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: onCodeScanned,
    })

    return (
        <View style={styles.container}>
            {device != null && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                    torch={torch ? 'on' : 'off'}
                    enableZoomGesture={true}
                />
            )}

            <StatusBarBlurBackground />

            <View style={styles.rightButtonRow}>
                <PressableOpacity style={styles.button} onPress={() => setTorch(!torch)} disabledOpacity={0.4}>
                    {/* <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} /> */}
                    {torch ? <Flash
                        size="32"
                        color="#FF8A65"
                    /> : <FlashSlash
                        size="32"
                        color="#FF8A65"
                    />}
                </PressableOpacity>
            </View>

            {/* Back Button */}
            <PressableOpacity style={styles.backButton} onPress={navigation.goBack}>
              <ArrowLeft2
            size="32"
            color="#FF8A65"
            />
                        </PressableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        top: SAFE_AREA_PADDING.paddingTop,
    },
    backButton: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        top: SAFE_AREA_PADDING.paddingTop,
    },
})