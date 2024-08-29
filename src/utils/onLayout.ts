import {LayoutChangeEvent} from 'react-native';

export const onLayout = (
  event: LayoutChangeEvent,
  setHeight: (height: number) => void,
): void => {
  const {height} = event.nativeEvent.layout;
  setHeight(height);
};
