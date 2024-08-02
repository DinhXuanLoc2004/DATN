import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
  containerGGAndFB: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 64,
    backgroundColor: colors.White_Color,
    padding: 10,
    borderRadius: 8,
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
    fontSize: 16,
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
