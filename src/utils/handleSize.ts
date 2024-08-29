import {Dimensions} from 'react-native';

export const {width: WIDTH_SCREEN} = Dimensions.get('window');
const BASE_WIDTH = 375;

export const handleSize = (size: number): number => {
  const scale = WIDTH_SCREEN / BASE_WIDTH;
  return Math.round(size * scale);
};
