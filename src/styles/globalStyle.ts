import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import { handleSize } from '../utils/handleSize';

export const globalStyles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: handleSize(50),
    position: 'absolute',
    bottom: 0
  },
  containerGGAndFB: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 'auto',
    aspectRatio: '7.29',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: handleSize(1),
    borderColor: colors.Primary_Color,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 4,
  },
  input: {
    width: '100%',
    height: handleSize(64),
    backgroundColor: colors.White_Color,
    padding: handleSize(10),
    borderRadius: handleSize(8),
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 3,
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: handleSize(16),
    color: colors.Text_Color,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.Backgournd_Color,
    paddingHorizontal: 14,
  },
});
