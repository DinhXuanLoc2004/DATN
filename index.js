/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { displayNotifycation } from './src/notifycations/DisplayNotifacation';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    await displayNotifycation({ title: remoteMessage.notification.title, body: remoteMessage.notification.body })
});

notifee.onForegroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
        case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            break;
    }
})

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.ACTION_PRESS) {
        await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
            method: 'POST',
        });
        await notifee.cancelNotification(notification.id);
    }
});

AppRegistry.registerComponent(appName, () => App);
