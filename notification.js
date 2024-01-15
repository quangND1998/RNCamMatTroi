import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { getFCMToken, saveFCMToken } from './common/asynStorage';
const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

const getFcmTokenFromLocalStorage = async() => {
    const fcmtoken = await getFCMToken()
    if (!fcmtoken) {
        try {
            const newFcmToken = await messaging().getToken();
            saveFCMToken(newFcmToken)
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('token found', fcmtoken);
    }
};
const getFcmToken = async() => {
    await messaging().registerDeviceForRemoteMessages();
    try {
        const newFcmToken = await messaging().getToken();
        return newFcmToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const notificationListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        })
        .catch(error => console.log('failed', error));

    messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
};

export {
    getFcmToken,
    getFcmTokenFromLocalStorage,
    requestUserPermission,
    notificationListener,
};