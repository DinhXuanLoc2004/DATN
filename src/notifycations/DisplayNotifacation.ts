import notifee, {AndroidImportance} from '@notifee/react-native';
import { useAppSelector } from '../helper/store/store';
import { colors } from '../constants/colors';

const createdChannel = async () => {
  return await notifee.createChannel({
    id: 'T_shop_channel_id',
    name: 'T shop chanle',
    importance: AndroidImportance.HIGH,
  });
};

const displayNotifycation = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const channelId = await createdChannel();

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      smallIcon: 'small_icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      color: colors.Primary_Color
    },
  });
};

export {createdChannel, displayNotifycation}
